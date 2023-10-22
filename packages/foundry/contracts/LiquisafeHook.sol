// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.21;

import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolId, PoolIdLibrary} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";
import {FullMath} from "@uniswap/v4-core/contracts/libraries/FullMath.sol";
import {SafeCast} from "@uniswap/v4-core/contracts/libraries/SafeCast.sol";
import {Position} from "@uniswap/v4-core/contracts/libraries/Position.sol";
import {IERC20Minimal} from "@uniswap/v4-core/contracts/interfaces/external/IERC20Minimal.sol";
import {BaseHook} from "./BaseHook.sol";
import {Currency, CurrencyLibrary} from "@uniswap/v4-core/contracts/types/Currency.sol";
import {BalanceDelta} from "@uniswap/v4-core/contracts/types/BalanceDelta.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolKey.sol";
import {FixedPointMathLib} from "solmate/utils/FixedPointMathLib.sol";
import {TickMath} from "@uniswap/v4-core/contracts/libraries/TickMath.sol";

import "./interfaces/uni-v3/core/IUniswapV3Pool.sol";
import "./interfaces/uni-v3/periphery/INonfungiblePositionManager.sol";

contract LiquisafeHook is BaseHook {
    using FixedPointMathLib for uint256;
    // Use the PoolIdLibrary for PoolKey to add the `.toId()` function on a PoolKey
    // which hashes the PoolKey struct into a bytes32 value
    using PoolIdLibrary for PoolKey;
    using CurrencyLibrary for Currency;

    mapping(PoolId poolId => int24 tickLower) public tickLowerLasts;
    mapping(PoolId poolId => mapping(int24 tick => mapping(bool zeroForOne => uint256[] positionIds)))
        public stopLossPositions;

    mapping(uint256 positionId => address creator) public positionCreator;

    INonfungiblePositionManager public positionManager;

    // constants for sqrtPriceLimitX96 which allow for unlimited impact
    // (stop loss *should* market sell regardless of market depth 🥴)
    uint160 public constant MIN_PRICE_LIMIT = TickMath.MIN_SQRT_RATIO + 1;
    uint160 public constant MAX_PRICE_LIMIT = TickMath.MAX_SQRT_RATIO - 1;

    error NotApproved();
    error NotOwner();
    error IncompatibleToken();
    error PositionNotFound();

    event Place(
        address indexed owner,
        uint256 indexed positionId,
        int24 indexed tick,
        bool zeroForOne
    );
    event Fill(uint256 indexed positionId);
    event Cancel(address indexed owner, uint256 indexed positionId);

    constructor(
        IPoolManager _poolManager,
        INonfungiblePositionManager _positionManager
    ) BaseHook(_poolManager) {
        positionManager = _positionManager;
    }

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
        return LiquisafeHook.afterInitialize.selector;
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
        return LiquisafeHook.afterSwap.selector;
    }

    function fillStopLoss(
        PoolKey calldata poolKey,
        int24 triggerTick,
        bool zeroForOne
    ) internal {
        PoolId poolId = poolKey.toId();
        uint256[] memory positionIds = stopLossPositions[poolId][triggerTick][
            zeroForOne
        ];

        // we withdraw all positions
        for (uint i = 0; i < positionIds.length; i++) {
            uint256 positionId = positionIds[i];
            address creator = positionCreator[positionId];

            if (creator != address(0)) {
                address owner = positionManager.ownerOf(positionId);
                // actual owner need to be the creator
                if (owner == creator) {
                    // only approved position can be manage
                    if (
                        positionManager.getApproved(positionId) ==
                        address(this) ||
                        positionManager.isApprovedForAll(owner, address(this))
                    ) {
                        (
                            ,
                            ,
                            address token0,
                            address token1,
                            ,
                            ,
                            ,
                            uint128 liquidity,
                            ,
                            ,
                            ,

                        ) = INonfungiblePositionManager(positionManager)
                                .positions(positionId);

                        INonfungiblePositionManager.DecreaseLiquidityParams
                            memory params = INonfungiblePositionManager
                                .DecreaseLiquidityParams({
                                    tokenId: positionId,
                                    liquidity: liquidity,
                                    amount0Min: 0,
                                    amount1Min: 0,
                                    deadline: block.timestamp
                                });

                        positionManager.decreaseLiquidity(params);

                        INonfungiblePositionManager.CollectParams
                            memory params2 = INonfungiblePositionManager
                                .CollectParams({
                                    tokenId: positionId,
                                    recipient: address(this),
                                    amount0Max: type(uint128).max,
                                    amount1Max: type(uint128).max
                                });

                        (uint256 amount0, uint256 amount1) = positionManager
                            .collect(params2);

                        //send liquidity back to owner
                        IERC20Minimal(token0).transfer(owner, amount0);
                        IERC20Minimal(token1).transfer(owner, amount1);

                        emit Fill(positionId);
                    }
                }
            }
            // if we can't manage the position it will be simply deleted
            delete positionCreator[positionId];
        }

        delete stopLossPositions[poolId][triggerTick][zeroForOne];
    }

    // -- Liquisafe User Facing Functions -- //
    function placeLiquidity(
        PoolKey calldata poolKey,
        int24 tickLower,
        bool zeroForOne,
        uint256 positionId
    ) external returns (int24 tick) {
        // check sender is the owner
        if (positionManager.ownerOf(positionId) != msg.sender) {
            revert NotOwner();
        }

        // check we can manage position
        if (
            !(positionManager.getApproved(positionId) == address(this) ||
                positionManager.isApprovedForAll(msg.sender, address(this)))
        ) {
            revert NotApproved();
        }

        (
            ,
            ,
            address token0,
            address token1,
            ,
            ,
            ,
            uint128 liquidity,
            ,
            ,
            ,

        ) = INonfungiblePositionManager(positionManager).positions(positionId);

        if (
            token0 != Currency.unwrap(poolKey.currency0) ||
            token1 != Currency.unwrap(poolKey.currency1)
        ) {
            revert IncompatibleToken();
        }

        // round down according to tickSpacing
        tick = getTickLower(tickLower, poolKey.tickSpacing);

        positionCreator[positionId] = msg.sender;
        stopLossPositions[poolKey.toId()][tick][zeroForOne].push(positionId);

        emit Place(msg.sender, positionId, tickLower, zeroForOne);
    }

    function cancelLiquidity(
        PoolKey calldata poolKey,
        int24 tickLower,
        bool zeroForOne,
        uint256 positionId
    ) external {
        if (msg.sender != positionCreator[positionId]) {
            revert NotOwner();
        }

        uint256[] memory positionIds = stopLossPositions[poolKey.toId()][
            tickLower
        ][zeroForOne];

        uint256 index = 0;
        bool find = false;

        // find the position from the array
        for (uint i = 0; i < positionIds.length; i++) {
            uint256 posId = positionIds[i];
            if (posId == positionId) {
                index = i;
                find = true;
                break;
            }
        }

        if (!find) {
            revert PositionNotFound();
        }

        uint256 length = stopLossPositions[poolKey.toId()][tickLower][
            zeroForOne
        ].length;

        // remove the position from the array
        stopLossPositions[poolKey.toId()][tickLower][zeroForOne][
            index
        ] = stopLossPositions[poolKey.toId()][tickLower][zeroForOne][
            length - 1
        ];
        stopLossPositions[poolKey.toId()][tickLower][zeroForOne].pop();

        // Todo remove the position from the array
        positionCreator[positionId] = address(0);

        emit Cancel(msg.sender, positionId);
    }

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
