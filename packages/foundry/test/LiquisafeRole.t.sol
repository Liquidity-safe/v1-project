// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import "../contracts/Liquisafe.sol";
import "../contracts/PriceOracle.sol";
import {ERC20} from "@openzeppelin2/contracts/token/ERC20/ERC20.sol";
import {Fixture} from "./Fixture.t.sol";

contract LiquisafeRoleTest is Fixture {
    function setUp() public override {
        super.setUp();
    }

    function test_AddFactory() public {
        assertEq(liquisafe.authorizedFactories(uniswapV2Factory), false);
        vm.startPrank(deployer);
        // add uni v2
        liquisafe.setFactory(uniswapV2Factory, true);
        assertEq(liquisafe.authorizedFactories(uniswapV2Factory), true);

        //remove uni v2
        liquisafe.setFactory(uniswapV2Factory, false);
        assertEq(liquisafe.authorizedFactories(uniswapV2Factory), false);
    }

    function test_AddManager() public {
        assertEq(
            liquisafe.nonFungiblePositionManagers(uniswapV3Factory),
            address(0)
        );
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

        //remove uni v3
        liquisafe.removeNonfungiblePositionManager(uniswapV3Factory);
        assertEq(
            liquisafe.nonFungiblePositionManagers(uniswapV3Factory),
            address(0)
        );
    }
}
