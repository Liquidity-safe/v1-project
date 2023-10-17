// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import "../contracts/Liquisafe.sol";
import "../contracts/PriceOracle.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract Fixture is Test {
    ERC20 public constant wEth =
        ERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

    address public constant uniswapV2Factory =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    ProxyAdmin public proxyAdmin;
    Liquisafe public liquisafe;
    PriceOracle public priceOracle;

    address deployer = makeAddr("Deployer");
    address alice = makeAddr("Alice");
    address bob = makeAddr("Bob");
    address charlie = makeAddr("Charlie");
    address daniel = makeAddr("Daniel");

    function setUp() public virtual {
        vm.createSelectFork("mainnet");
        vm.startPrank(deployer);

        proxyAdmin = new ProxyAdmin(deployer);

        priceOracle = PriceOracle(
            _deployProxy(
                address(new PriceOracle()),
                abi.encodeWithSelector(PriceOracle.initialize.selector)
            )
        );

        liquisafe = Liquisafe(
            _deployProxy(
                address(new Liquisafe()),
                abi.encodeWithSelector(
                    Liquisafe.initialize.selector,
                    address(priceOracle),
                    address(wEth)
                )
            )
        );
    }

    function _deployProxy(
        address implementation_,
        bytes memory initializer_
    ) internal returns (address) {
        return
            address(
                new TransparentUpgradeableProxy(
                    implementation_,
                    address(proxyAdmin),
                    initializer_
                )
            );
    }
}
