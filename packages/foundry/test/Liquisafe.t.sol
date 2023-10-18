// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "../contracts/Liquisafe.sol";
import "../contracts/PriceOracle.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Fixture} from "./Fixture.t.sol";

contract LiquisafeTest is Fixture {
    function setUp() public override {
        super.setUp();

        deal(alice, 1000 ether);
        deal(address(usdcToken), alice, 10_000 * 10 ** usdcToken.decimals());

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

        vm.stopPrank();
    }

    function test_AddOrder() public {
        // get liquidity amount
        address pair = IUniswapV2Factory(uniswapV2Factory).getPair(
            address(usdcToken),
            address(wEth)
        );
        uint256 liquidity = ERC20(pair).balanceOf(alice);
        console.log("Alice liquidity %s", liquidity);

        vm.prank(alice);
        liquisafe.addOrder(
            Liquisafe.OrderType.UniV2,
            Liquisafe.OrderRole.Withdraw,
            alice,
            uniswapV2Factory,
            address(usdcToken),
            address(wEth),
            0,
            0,
            uint128(liquidity),
            uint128(95 * 10 ** (liquisafe.decimalsUsd() - 1)),
            uint128(1500 * 10 ** liquisafe.decimalsUsd())
        );
    }
}
