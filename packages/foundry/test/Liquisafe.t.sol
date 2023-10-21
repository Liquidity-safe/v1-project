// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "../contracts/Liquisafe.sol";
import "../contracts/PriceOracle.sol";
import {ERC20} from "@openzeppelin2/contracts/token/ERC20/ERC20.sol";
import {Fixture} from "./Fixture.t.sol";
import "../contracts/interfaces/uni-v3/core/IUniswapV3Factory.sol";
import "../contracts/interfaces/uni-v3/core/IUniswapV3Pool.sol";

contract LiquisafeTest is Fixture {
    /// @dev The minimum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**-128
    int24 internal constant MIN_TICK = -887272;
    /// @dev The maximum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**128
    int24 internal constant MAX_TICK = -MIN_TICK;

    function setUp() public override {
        super.setUp();

        deal(alice, 2000 ether);
        deal(address(usdcToken), alice, 20_000 * 10 ** usdcToken.decimals());

        vm.startPrank(deployer);

        // add uni v3
        liquisafe.setFactory(uniswapV3Factory, true);
        liquisafe.setNonfungiblePositionManager(
            uniswapV3Factory,
            uniswapV3PositionManager
        );
        assertEq(
            liquisafe.nonFungiblePositionManagers(uniswapV3Factory),
            uniswapV3PositionManager
        );

        // add uni v2
        liquisafe.setFactory(uniswapV2Factory, true);
        assertEq(liquisafe.authorizedFactories(uniswapV2Factory), true);

        vm.stopPrank();

        vm.startPrank(alice);
        // create liquidity v2
        usdcToken.approve(
            address(uniswapV2Router),
            10_000 * 10 ** usdcToken.decimals()
        );
        uniswapV2Router.addLiquidityETH{value: 10 ether}(
            address(usdcToken),
            10_000 * 10 ** usdcToken.decimals(),
            10_000 * 10 ** usdcToken.decimals(),
            5 ether,
            alice,
            block.timestamp
        );

        // create liquidity v3
        usdcToken.approve(
            address(uniswapV3PositionManager),
            10_000 * 10 ** usdcToken.decimals()
        );

        vm.stopPrank();
    }

    function getMinTick(int24 tickSpacing) internal pure returns (int24) {
        return (MIN_TICK / tickSpacing) * tickSpacing;
    }

    function getMaxTick(int24 tickSpacing) internal pure returns (int24) {
        return (MAX_TICK / tickSpacing) * tickSpacing;
    }

    function test_AddOrder() public {
        // get liquidity amount
        address pair = IUniswapV2Factory(uniswapV2Factory).getPair(
            address(usdcToken),
            address(wEth)
        );
        uint256 liquidity = ERC20(pair).balanceOf(alice);
        console.log("Alice liquidity %s", liquidity);

        vm.startPrank(alice);
        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(liquidity),
            uint128(95 * 10 ** (liquisafe.decimalsUsd() - 1)),
            uint128(1500 * 10 ** liquisafe.decimalsUsd())
        );
    }

    function test_CancelOrder() public {
        // get liquidity amount
        address pair = IUniswapV2Factory(uniswapV2Factory).getPair(
            address(usdcToken),
            address(wEth)
        );
        uint256 liquidity = ERC20(pair).balanceOf(alice);
        console.log("Alice liquidity %s", liquidity);

        vm.startPrank(alice);
        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(liquidity),
            uint128(95 * 10 ** (liquisafe.decimalsUsd() - 1)),
            uint128(1500 * 10 ** liquisafe.decimalsUsd())
        );

        liquisafe.cancelOrder(0);
    }

    function test_CanExecuteOrder() public {
        address pair = IUniswapV2Factory(uniswapV2Factory).getPair(
            address(usdcToken),
            address(wEth)
        );

        vm.startPrank(alice, alice);

        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(1000000000),
            0,
            uint128(150 * 10 ** liquisafe.decimalsUsd())
        );

        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(1000000000),
            0,
            uint128(5000 * 10 ** liquisafe.decimalsUsd())
        );

        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(1000000000),
            uint128(50 * 10 ** liquisafe.decimalsUsd()),
            uint128(5000 * 10 ** liquisafe.decimalsUsd())
        );

        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(1000000000),
            uint128((5 * 10 ** liquisafe.decimalsUsd()) / 10),
            uint128(500 * 10 ** liquisafe.decimalsUsd())
        );

        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(1000000000),
            uint128((5 * 10 ** liquisafe.decimalsUsd())),
            0
        );

        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(1000000000),
            uint128((5 * 10 ** liquisafe.decimalsUsd()) / 10),
            0
        );

        vm.stopPrank();
        bool canExecute = liquisafe.canExecuteOrder(0);
        assertEq(canExecute, false);
        canExecute = liquisafe.canExecuteOrder(1);
        assertEq(canExecute, true);
        canExecute = liquisafe.canExecuteOrder(2);
        assertEq(canExecute, true);
        canExecute = liquisafe.canExecuteOrder(3);
        assertEq(canExecute, false);
        canExecute = liquisafe.canExecuteOrder(4);
        assertEq(canExecute, true);
        canExecute = liquisafe.canExecuteOrder(5);
        assertEq(canExecute, false);
    }

    function test_ExecuteOrderV2() public {
        address pair = IUniswapV2Factory(uniswapV2Factory).getPair(
            address(usdcToken),
            address(wEth)
        );

        ERC20 liquidityPair = ERC20(pair);
        uint256 liquidity = liquidityPair.balanceOf(alice);

        vm.startPrank(alice, alice);
        liquidityPair.approve(address(liquisafe), liquidity);

        liquisafe.addOrderV2(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            uint128(liquidity),
            uint128((9 * 10 ** liquisafe.decimalsUsd()) / 10),
            uint128(1800 * 10 ** liquisafe.decimalsUsd())
        );

        vm.stopPrank();

        vm.prank(bob);
        uint256[] memory orders = new uint256[](1);
        orders[0] = 0;
        bool[] memory executed = liquisafe.executeOrders(orders);
        assertEq(executed[0], true);
    }

    function test_ExecuteOrderV3() public {
        vm.startPrank(alice);

        address pool = IUniswapV3Factory(uniswapV3Factory).getPool(
            address(usdcToken),
            address(wEth),
            500
        );
        INonfungiblePositionManager nonfungiblePositionManager = INonfungiblePositionManager(
                uniswapV3PositionManager
            );

        int24 tick = IUniswapV3Pool(pool).tickSpacing();

        INonfungiblePositionManager.MintParams
            memory params = INonfungiblePositionManager.MintParams({
                token0: address(usdcToken),
                token1: address(wEth),
                fee: 500,
                tickLower: getMinTick(tick),
                tickUpper: getMaxTick(tick),
                amount0Desired: 10_000 * 10 ** usdcToken.decimals(),
                amount1Desired: 10 ether,
                amount0Min: 0,
                amount1Min: 0,
                recipient: alice,
                deadline: block.timestamp
            });

        (
            uint256 tokenId,
            uint256 liquidity,
            uint256 amount0,
            uint256 amount1
        ) = nonfungiblePositionManager.mint{value: 10 ether}(params);

        console.log("alice pos v3 tokenId %s ", tokenId);

        console.log(
            "alice pos v3 liquidity %s amount0 %s amount1 %s",
            liquidity,
            amount0,
            amount1
        );

        address pair = IUniswapV3Factory(address(uniswapV3Factory)).getPool(
            address(usdcToken),
            address(wEth),
            500
        );

        nonfungiblePositionManager.approve(address(liquisafe), tokenId);

        liquisafe.addOrderV3(
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV3Factory,
            tokenId,
            uint128(liquidity),
            uint128((9 * 10 ** liquisafe.decimalsUsd()) / 10),
            uint128(1800 * 10 ** liquisafe.decimalsUsd())
        );

        vm.stopPrank();

        vm.prank(bob);
        uint256[] memory orders = new uint256[](1);
        orders[0] = 0;
        bool[] memory executed = liquisafe.executeOrders(orders);
        assertEq(executed[0], true);
    }
}
