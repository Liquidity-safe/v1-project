//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";

import "../contracts/Liquisafe.sol";
import "../contracts/PriceOracle.sol";

import "../contracts/interfaces/IUniswapV2Router02.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract DeployLiquisafeScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    ERC20 public constant wEth =
        ERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

    ERC20 public constant usdcToken =
        ERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);

    ERC20 public constant btcToken =
        ERC20(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599);

    ERC20 public constant linkToken =
        ERC20(0x514910771AF9Ca656af840dff83E8264EcF986CA);

    address public constant uniswapV2Factory =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    address public constant uniswapV3Factory =
        0x1F98431c8aD98523631AE4a59f267346ea31F984;

    address public constant uniswapV3PositionManager =
        0xC36442b4a4522E871399CD717aBDD847Ab11FE88;

    IUniswapV2Router02 public constant uniswapV2Router =
        IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);

    ProxyAdmin public proxyAdmin;
    Liquisafe public liquisafe;
    PriceOracle public priceOracle;

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        proxyAdmin = new ProxyAdmin(vm.addr(deployerPrivateKey));

        priceOracle = PriceOracle(
            _deployProxy(
                address(new PriceOracle()),
                abi.encodeWithSelector(PriceOracle.initialize.selector)
            )
        );

        priceOracle.addPriceFeed(
            address(wEth),
            0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
        );

        priceOracle.addPriceFeed(
            address(btcToken),
            0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c
        );

        priceOracle.addPriceFeed(
            address(usdcToken),
            0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6
        );

        priceOracle.addPriceFeed(
            address(linkToken),
            0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c
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

        console.logString(
            string.concat(
                "Liquisafe deployed at: ",
                vm.toString(address(liquisafe))
            )
        );

        console.logString(
            string.concat(
                "PriceOracle deployed at: ",
                vm.toString(address(priceOracle))
            )
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
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
