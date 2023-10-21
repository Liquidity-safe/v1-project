// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.21;

import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolId, PoolIdLibrary} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";
import {FullMath} from "@uniswap/v4-core/contracts/libraries/FullMath.sol";
import {SafeCast} from "@uniswap/v4-core/contracts/libraries/SafeCast.sol";
import {Position} from "@uniswap/v4-core/contracts/libraries/Position.sol";
import {IERC20Minimal} from "@uniswap/v4-core/contracts/interfaces/external/IERC20Minimal.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {BaseHook} from "./BaseHook.sol";
import {Currency, CurrencyLibrary} from "@uniswap/v4-core/contracts/types/Currency.sol";
import {BalanceDelta} from "@uniswap/v4-core/contracts/types/BalanceDelta.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolKey.sol";
import {FixedPointMathLib} from "solmate/utils/FixedPointMathLib.sol";
import {TickMath} from "@uniswap/v4-core/contracts/libraries/TickMath.sol";

contract TataHook is BaseHook, ERC1155 {
    using FixedPointMathLib for uint256;
    // Use the PoolIdLibrary for PoolKey to add the `.toId()` function on a PoolKey
    // which hashes the PoolKey struct into a bytes32 value
    using PoolIdLibrary for PoolKey;
    using CurrencyLibrary for Currency;

    struct PositionInfo {
        address owner;
        int24 tickLower;
        int24 tickUpper;
    }

    mapping(PoolId poolId => int24 tickLower) public tickLowerLasts;
    mapping(PoolId poolId => mapping(int24 tick => mapping(bool zeroForOne => PositionInfo[] positions)))
        public stopLossPositions;

    mapping(bytes32 position => uint256 index) public indexPosition;
    mapping(bytes32 position => bool have) public havePosition;

    // constants for sqrtPriceLimitX96 which allow for unlimited impact
    // (stop loss *should* market sell regardless of market depth 🥴)
    uint160 public constant MIN_PRICE_LIMIT = TickMath.MIN_SQRT_RATIO + 1;
    uint160 public constant MAX_PRICE_LIMIT = TickMath.MAX_SQRT_RATIO - 1;

    constructor(IPoolManager _poolManager) BaseHook(_poolManager) ERC1155("") {}

    function getHooksCalls() public pure override returns (Hooks.Calls memory) {
        return
            Hooks.Calls({
                beforeInitialize: false,
                afterInitialize: true,
                beforeModifyPosition: false,
                afterModifyPosition: false,
                beforeSwap: false,
                afterSwap: true,
                beforeDonate: false,
                afterDonate: false
            });
    }

    function afterInitialize(
        address,
        PoolKey calldata key,
        uint160,
        int24 tick,
        bytes calldata
    ) external override poolManagerOnly returns (bytes4) {
        setTickLowerLast(key.toId(), getTickLower(tick, key.tickSpacing));
        return TataHook.afterInitialize.selector;
    }

    function afterSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        BalanceDelta,
        bytes calldata
    ) external override poolManagerOnly returns (bytes4) {
        int24 prevTick = tickLowerLasts[key.toId()];
        (, int24 tick, , ) = poolManager.getSlot0(key.toId());
        int24 currentTick = getTickLower(tick, key.tickSpacing);
        tick = prevTick;

        // fill stop losses in the opposite direction of the swap
        // avoids abuse/attack vectors
        bool stopLossZeroForOne = !params.zeroForOne;

        // TODO: test for off by one because of inequality
        if (prevTick < currentTick) {
            for (; tick < currentTick; ) {
                uint256 posAmount = stopLossPositions[key.toId()][tick][
                    stopLossZeroForOne
                ].length;
                if (posAmount > 0) {
                    fillStopLoss(key, tick, stopLossZeroForOne);
                }
                unchecked {
                    tick += key.tickSpacing;
                }
            }
        } else {
            for (; currentTick < tick; ) {
                uint256 posAmount = stopLossPositions[key.toId()][tick][
                    stopLossZeroForOne
                ].length;
                if (posAmount > 0) {
                    fillStopLoss(key, tick, stopLossZeroForOne);
                }
                unchecked {
                    tick -= key.tickSpacing;
                }
            }
        }
        return TataHook.afterSwap.selector;
    }

    function fillStopLoss(
        PoolKey calldata poolKey,
        int24 triggerTick,
        bool zeroForOne
    ) internal {
        PoolId poolId = poolKey.toId();
        PositionInfo[] memory positions = stopLossPositions[poolId][
            triggerTick
        ][zeroForOne];

        // we withdraw all positions
        for (uint i = 0; i < positions.length; i++) {
            PositionInfo memory position = positions[i];
            Position.Info memory positionInfo = poolManager.getPosition(
                poolId,
                position.owner,
                position.tickLower,
                position.tickUpper
            );
            if (positionInfo.liquidity > 0) {
                // poolManager.modifyPosition(
                //     poolKey,
                //     IPoolManager.ModifyPositionParams(
                //         position.owner,
                //         position.tickLower,
                //         position.tickUpper,
                //         -positionInfo.liquidity
                //     )
                // );
            }
        }
    }

    // // -- Stop Loss User Facing Functions -- //
    // function placeStopLoss(
    //     PoolKey calldata poolKey,
    //     int24 tickLower,
    //     bool zeroForOne
    // ) external returns (int24 tick) {
    //     // round down according to tickSpacing
    //     // TODO: should we round up depending on direction of the position?
    //     tick = getTickLower(tickLower, poolKey.tickSpacing);
    //     // TODO: safe casting
    //     stopLossPositions[poolKey.toId()][tick][zeroForOne] += int256(amountIn);
    // }

    // -- Util functions -- //
    function setTickLowerLast(PoolId poolId, int24 tickLower) private {
        tickLowerLasts[poolId] = tickLower;
    }

    function getTickLower(
        int24 tick,
        int24 tickSpacing
    ) private pure returns (int24) {
        int24 compressed = tick / tickSpacing;
        if (tick < 0 && tick % tickSpacing != 0) compressed--; // round towards negative infinity
        return compressed * tickSpacing;
    }
}
