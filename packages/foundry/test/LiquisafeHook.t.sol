// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";
import {LiquisafeHook, Epoch, EpochLibrary} from "../contracts/LiquisafeHook.sol";
import {LiquisafeHookImplementation} from "../contracts/LiquisafeHookImplementation.sol";
import {PoolManager} from "@uniswap/v4-core/contracts/PoolManager.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {Deployers} from "@uniswap/v4-core/test/foundry-tests/utils/Deployers.sol";
import {TokenFixture} from "@uniswap/v4-core/test/foundry-tests/utils/TokenFixture.sol";
import {TestERC20} from "@uniswap/v4-core/contracts/test/TestERC20.sol";
import {CurrencyLibrary, Currency} from "@uniswap/v4-core/contracts/types/Currency.sol";
import {PoolId, PoolIdLibrary} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {PoolSwapTest} from "@uniswap/v4-core/contracts/test/PoolSwapTest.sol";
import {TickMath} from "@uniswap/v4-core/contracts/libraries/TickMath.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolKey.sol";

contract GetSender {
    function sender() external view returns (address) {
        return msg.sender;
    }
}

contract TestLiquisafeHook is Test, Deployers, TokenFixture {
    using PoolIdLibrary for PoolKey;

    uint160 constant SQRT_RATIO_10_1 = 250541448375047931186413801569;

    TestERC20 token0;
    TestERC20 token1;
    PoolManager manager;
    LiquisafeHook liquisafeHook =
        LiquisafeHook(
            address(
                uint160(Hooks.AFTER_INITIALIZE_FLAG | Hooks.AFTER_SWAP_FLAG)
            )
        );
    PoolKey key;
    PoolId id;

    PoolSwapTest swapRouter;

    function setUp() public {
        initializeTokens();
        token0 = TestERC20(Currency.unwrap(currency0));
        token1 = TestERC20(Currency.unwrap(currency1));

        manager = new PoolManager(500000);

        vm.record();
        LiquisafeHookImplementation impl = new LiquisafeHookImplementation(
            manager,
            liquisafeHook
        );
        (, bytes32[] memory writes) = vm.accesses(address(impl));
        vm.etch(address(liquisafeHook), address(impl).code);
        // for each storage key that was written during the hook implementation, copy the value over
        unchecked {
            for (uint256 i = 0; i < writes.length; i++) {
                bytes32 slot = writes[i];
                vm.store(
                    address(liquisafeHook),
                    slot,
                    vm.load(address(impl), slot)
                );
            }
        }

        key = PoolKey(currency0, currency1, 3000, 60, liquisafeHook);
        id = key.toId();
        manager.initialize(key, SQRT_RATIO_1_1, ZERO_BYTES);

        swapRouter = new PoolSwapTest(manager);

        token0.approve(address(liquisafeHook), type(uint256).max);
        token1.approve(address(liquisafeHook), type(uint256).max);
        token0.approve(address(swapRouter), type(uint256).max);
        token1.approve(address(swapRouter), type(uint256).max);
    }

    function testGetTickLowerLast() public {
        assertEq(liquisafeHook.getTickLowerLast(id), 0);
    }

    function testGetTickLowerLastWithDifferentPrice() public {
        PoolKey memory differentKey = PoolKey(
            Currency.wrap(address(token0)),
            Currency.wrap(address(token1)),
            3000,
            61,
            liquisafeHook
        );
        manager.initialize(differentKey, SQRT_RATIO_10_1, ZERO_BYTES);
        assertEq(liquisafeHook.getTickLowerLast(differentKey.toId()), 22997);
    }

    function testEpochNext() public {
        assertTrue(
            EpochLibrary.equals(liquisafeHook.epochNext(), Epoch.wrap(1))
        );
    }

    function testZeroLiquidityRevert() public {
        vm.expectRevert(LiquisafeHook.ZeroLiquidity.selector);
        liquisafeHook.place(key, 0, true, 0);
    }

    function testZeroForOneRightBoundaryOfCurrentRange() public {
        int24 tickLower = 60;
        bool zeroForOne = true;
        uint128 liquidity = 1000000;
        liquisafeHook.place(key, tickLower, zeroForOne, liquidity);
        assertTrue(
            EpochLibrary.equals(
                liquisafeHook.getEpoch(key, tickLower, zeroForOne),
                Epoch.wrap(1)
            )
        );
        assertEq(
            manager.getLiquidity(
                id,
                address(liquisafeHook),
                tickLower,
                tickLower + 60
            ),
            liquidity
        );
    }

    function testZeroForOneLeftBoundaryOfCurrentRange() public {
        int24 tickLower = 0;
        bool zeroForOne = true;
        uint128 liquidity = 1000000;
        liquisafeHook.place(key, tickLower, zeroForOne, liquidity);
        assertTrue(
            EpochLibrary.equals(
                liquisafeHook.getEpoch(key, tickLower, zeroForOne),
                Epoch.wrap(1)
            )
        );
        assertEq(
            manager.getLiquidity(
                id,
                address(liquisafeHook),
                tickLower,
                tickLower + 60
            ),
            liquidity
        );
    }

    function testZeroForOneCrossedRangeRevert() public {
        vm.expectRevert(LiquisafeHook.CrossedRange.selector);
        liquisafeHook.place(key, -60, true, 1000000);
    }

    function testZeroForOneInRangeRevert() public {
        // swapping is free, there's no liquidity in the pool, so we only need to specify 1 wei
        swapRouter.swap(
            key,
            IPoolManager.SwapParams(false, 1, SQRT_RATIO_1_1 + 1),
            PoolSwapTest.TestSettings(true, true),
            ZERO_BYTES
        );
        vm.expectRevert(LiquisafeHook.InRange.selector);
        liquisafeHook.place(key, 0, true, 1000000);
    }

    function testNotZeroForOneLeftBoundaryOfCurrentRange() public {
        int24 tickLower = -60;
        bool zeroForOne = false;
        uint128 liquidity = 1000000;
        liquisafeHook.place(key, tickLower, zeroForOne, liquidity);
        assertTrue(
            EpochLibrary.equals(
                liquisafeHook.getEpoch(key, tickLower, zeroForOne),
                Epoch.wrap(1)
            )
        );
        assertEq(
            manager.getLiquidity(
                id,
                address(liquisafeHook),
                tickLower,
                tickLower + 60
            ),
            liquidity
        );
    }

    function testNotZeroForOneCrossedRangeRevert() public {
        vm.expectRevert(LiquisafeHook.CrossedRange.selector);
        liquisafeHook.place(key, 0, false, 1000000);
    }

    function testNotZeroForOneInRangeRevert() public {
        // swapping is free, there's no liquidity in the pool, so we only need to specify 1 wei
        swapRouter.swap(
            key,
            IPoolManager.SwapParams(true, 1, SQRT_RATIO_1_1 - 1),
            PoolSwapTest.TestSettings(true, true),
            ZERO_BYTES
        );
        vm.expectRevert(LiquisafeHook.InRange.selector);
        liquisafeHook.place(key, -60, false, 1000000);
    }

    function testMultipleLPs() public {
        int24 tickLower = 60;
        bool zeroForOne = true;
        uint128 liquidity = 1000000;
        liquisafeHook.place(key, tickLower, zeroForOne, liquidity);
        address other = 0x1111111111111111111111111111111111111111;
        token0.transfer(other, 1e18);
        token1.transfer(other, 1e18);
        vm.startPrank(other);
        token0.approve(address(liquisafeHook), type(uint256).max);
        token1.approve(address(liquisafeHook), type(uint256).max);
        liquisafeHook.place(key, tickLower, zeroForOne, liquidity);
        vm.stopPrank();
        assertTrue(
            EpochLibrary.equals(
                liquisafeHook.getEpoch(key, tickLower, zeroForOne),
                Epoch.wrap(1)
            )
        );
        assertEq(
            manager.getLiquidity(
                id,
                address(liquisafeHook),
                tickLower,
                tickLower + 60
            ),
            liquidity * 2
        );

        (
            bool filled,
            Currency currency0,
            Currency currency1,
            uint256 token0Total,
            uint256 token1Total,
            uint128 liquidityTotal
        ) = liquisafeHook.epochInfos(Epoch.wrap(1));
        assertFalse(filled);
        assertTrue(currency0 == Currency.wrap(address(token0)));
        assertTrue(currency1 == Currency.wrap(address(token1)));
        assertEq(token0Total, 0);
        assertEq(token1Total, 0);
        assertEq(liquidityTotal, liquidity * 2);
        assertEq(
            liquisafeHook.getEpochLiquidity(
                Epoch.wrap(1),
                new GetSender().sender()
            ),
            liquidity
        );
        assertEq(
            liquisafeHook.getEpochLiquidity(Epoch.wrap(1), other),
            liquidity
        );
    }

    event Transfer(address indexed from, address indexed to, uint256 value);

    function testKill() public {
        int24 tickLower = 0;
        bool zeroForOne = true;
        uint128 liquidity = 1000000;
        liquisafeHook.place(key, tickLower, zeroForOne, liquidity);
        vm.expectEmit(true, true, true, true, address(token0));
        emit Transfer(address(manager), new GetSender().sender(), 2995);
        liquisafeHook.kill(
            key,
            tickLower,
            zeroForOne,
            new GetSender().sender()
        );
    }

    function testSwapAcrossRange() public {
        int24 tickLower = 0;
        bool zeroForOne = true;
        uint128 liquidity = 1000000;
        liquisafeHook.place(key, tickLower, zeroForOne, liquidity);

        swapRouter.swap(
            key,
            IPoolManager.SwapParams(
                false,
                1e18,
                TickMath.getSqrtRatioAtTick(60)
            ),
            PoolSwapTest.TestSettings(true, true),
            ZERO_BYTES
        );

        assertEq(liquisafeHook.getTickLowerLast(id), 60);
        (, int24 tick, , ) = manager.getSlot0(id);
        assertEq(tick, 60);

        (
            bool filled,
            ,
            ,
            uint256 token0Total,
            uint256 token1Total,

        ) = liquisafeHook.epochInfos(Epoch.wrap(1));

        assertTrue(filled);
        assertEq(token0Total, 0);
        assertEq(token1Total, 2996 + 17); // 3013, 2 wei of dust
        assertEq(
            manager.getLiquidity(
                id,
                address(liquisafeHook),
                tickLower,
                tickLower + 60
            ),
            0
        );

        vm.expectEmit(true, true, true, true, address(token1));
        emit Transfer(address(manager), new GetSender().sender(), 2996 + 17);
        liquisafeHook.withdraw(Epoch.wrap(1), new GetSender().sender());

        (, , , token0Total, token1Total, ) = liquisafeHook.epochInfos(
            Epoch.wrap(1)
        );

        assertEq(token0Total, 0);
        assertEq(token1Total, 0);
    }
}
