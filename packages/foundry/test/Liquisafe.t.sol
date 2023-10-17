// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import "../contracts/Liquisafe.sol";
import "../contracts/PriceOracle.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Fixture} from "./Fixture.t.sol";

contract LiquisafeTest is Fixture {
    function setUp() public override {
        super.setUp();
    }

    function test_AddFactory() public {
        assertEq(liquisafe.authorizedFactories(uniswapV2Factory), false);
        vm.prank(deployer);
        liquisafe.setFactory(uniswapV2Factory, true);
        assertEq(liquisafe.authorizedFactories(uniswapV2Factory), true);
    }
}
