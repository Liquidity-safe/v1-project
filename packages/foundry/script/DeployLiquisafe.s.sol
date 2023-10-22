//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";

import "../contracts/Liquisafe.sol";
import "../contracts/PriceOracle.sol";

import "../contracts/interfaces/IUniswapV2Router02.sol";
import {ERC20} from "@openzeppelin2/contracts/token/ERC20/ERC20.sol";

import {TransparentUpgradeableProxy} from "@openzeppelin2/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {ProxyAdmin} from "@openzeppelin2/contracts/proxy/transparent/ProxyAdmin.sol";

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
    uint256 private deployerPrivateKey;

    function run() external {
        deployerPrivateKey = setupLocalhostEnv();
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

        if (block.chainid == 31337) {
            _deployTest();
        }

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

    function _deployTest() private {
        // add factory
        liquisafe.setFactory(address(uniswapV2Factory), true);
        liquisafe.setFactory(address(uniswapV3Factory), true);
        liquisafe.setNonfungiblePositionManager(
            address(uniswapV3Factory),
            address(uniswapV3PositionManager)
        );

        // add price oracle
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

        address receiver = vm.addr(deployerPrivateKey);

        // create liquidity
        vm.deal(receiver, 10000 ether);

        usdcToken.approve(
            address(uniswapV2Router),
            10_000 * 10 ** usdcToken.decimals()
        );

        address[] memory paths = new address[](2);
        paths[0] = address(wEth);
        paths[1] = address(usdcToken);

        uniswapV2Router.swapExactETHForTokens{value: 1000 ether}(
            0,
            paths,
            receiver,
            block.timestamp + 10000
        );

        paths[1] = address(btcToken);
        uniswapV2Router.swapExactETHForTokens{value: 1000 ether}(
            0,
            paths,
            receiver,
            block.timestamp + 10000
        );

        uint256 balance = usdcToken.balanceOf(receiver);

        console.log("balance user %s amout %s", receiver, balance);

        uniswapV2Router.addLiquidityETH{value: 10 ether}(
            address(usdcToken),
            10_000 * 10 ** usdcToken.decimals(),
            10_000 * 10 ** usdcToken.decimals(),
            5 ether,
            receiver,
            block.timestamp + 10000
        );

        btcToken.approve(
            address(uniswapV2Router),
            5 * 10 ** btcToken.decimals()
        );

        uniswapV2Router.addLiquidityETH{value: 90 ether}(
            address(btcToken),
            5 * 10 ** btcToken.decimals(),
            1 * 10 ** btcToken.decimals(),
            50 ether,
            receiver,
            block.timestamp + 10000
        );

        usdcToken.approve(
            address(uniswapV3PositionManager),
            10_000 * 10 ** usdcToken.decimals()
        );
        _mintV3(
            uniswapV3PositionManager,
            address(usdcToken),
            address(wEth),
            10_000 * 10 ** usdcToken.decimals(),
            10 ether,
            10 ether,
            500
        );

        btcToken.approve(
            address(uniswapV3PositionManager),
            5 * 10 ** btcToken.decimals()
        );

        _mintV3(
            uniswapV3PositionManager,
            address(btcToken),
            address(wEth),
            5 * 10 ** btcToken.decimals(),
            90 ether,
            90 ether,
            3000
        );
    }

    /// @dev The minimum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**-128
    int24 internal constant MIN_TICK = -887272;
    /// @dev The maximum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**128
    int24 internal constant MAX_TICK = -MIN_TICK;

    function _mintV3(
        address position,
        address token0,
        address token1,
        uint256 amount0,
        uint256 amount1,
        uint256 amountEther,
        uint24 fee
    ) private {
        address pool = IUniswapV3Factory(uniswapV3Factory).getPool(
            address(token0),
            address(token1),
            fee
        );
        INonfungiblePositionManager nonfungiblePositionManager = INonfungiblePositionManager(
                uniswapV3PositionManager
            );

        int24 tick = IUniswapV3Pool(pool).tickSpacing();

        address receiver = vm.addr(deployerPrivateKey);
        INonfungiblePositionManager.MintParams
            memory params = INonfungiblePositionManager.MintParams({
                token0: address(token0),
                token1: address(token1),
                fee: fee,
                tickLower: getMinTick(tick),
                tickUpper: getMaxTick(tick),
                amount0Desired: amount0,
                amount1Desired: amount1,
                amount0Min: 0,
                amount1Min: 0,
                recipient: receiver,
                deadline: block.timestamp + 10000
            });

        nonfungiblePositionManager.mint{value: amountEther}(params);
    }

    function getMinTick(int24 tickSpacing) internal pure returns (int24) {
        return (MIN_TICK / tickSpacing) * tickSpacing;
    }

    function getMaxTick(int24 tickSpacing) internal pure returns (int24) {
        return (MAX_TICK / tickSpacing) * tickSpacing;
    }
}
