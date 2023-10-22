// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";
import {LiquisafeHook} from "../contracts/LiquisafeHook.sol";
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
import "../contracts/interfaces/uni-v3/periphery/INonfungiblePositionManager.sol";
import "../contracts/interfaces/uni-v3/core/IUniswapV3Factory.sol";

contract TestLiquisafeHook is Test, Deployers, TokenFixture {
    using PoolIdLibrary for PoolKey;

    uint160 constant SQRT_RATIO_10_1 = 250541448375047931186413801569;

    INonfungiblePositionManager public constant uniswapV3PositionManager =
        INonfungiblePositionManager(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);

    IUniswapV3Factory public constant uniswapV3Factory =
        IUniswapV3Factory(0x1F98431c8aD98523631AE4a59f267346ea31F984);

    TestERC20 token0;
    TestERC20 token1;

    uint24 poolFee = 500;

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

    address deployer = makeAddr("Deployer");
    address alice = makeAddr("Alice");
    address bob = makeAddr("Bob");

    function setUp() public {
        vm.createSelectFork("mainnet");

        initializeTokens();
        token0 = TestERC20(Currency.unwrap(currency0));
        token1 = TestERC20(Currency.unwrap(currency1));

        manager = new PoolManager(500000);

        vm.record();
        LiquisafeHookImplementation impl = new LiquisafeHookImplementation(
            manager,
            uniswapV3PositionManager,
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

        uniswapV3Factory.createPool(address(token0), address(token1), poolFee);

        token0.approve(address(liquisafeHook), type(uint256).max);
        token1.approve(address(liquisafeHook), type(uint256).max);
        token0.approve(address(swapRouter), type(uint256).max);
        token1.approve(address(swapRouter), type(uint256).max);
        token0.approve(address(uniswapV3PositionManager), type(uint256).max);
        token1.approve(address(uniswapV3PositionManager), type(uint256).max);
    }

    function TestAddLiquidity() public {
        // uniswapV3Factory.createPool(token0,token1)
        _mintPosition(1500 * 10 ** 6, 10 ** 6, alice);
    }

    function _mintPosition(
        uint256 amount0ToMint,
        uint256 amount1ToMint,
        address recipient
    ) private returns (uint256) {
        INonfungiblePositionManager.MintParams
            memory params = INonfungiblePositionManager.MintParams({
                token0: address(token0),
                token1: address(token1),
                fee: poolFee,
                tickLower: TickMath.MIN_TICK,
                tickUpper: TickMath.MAX_TICK,
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: recipient,
                deadline: block.timestamp
            });

        // Note that the pool defined by DAI/USDC and fee tier 0.3% must already be created and initialized in order to mint
        (uint256 tokenId, , , ) = uniswapV3PositionManager.mint(params);

        return tokenId;
    }
}
