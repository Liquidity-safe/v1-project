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
import "../contracts/interfaces/uni-v3/core/IUniswapV3Pool.sol";

import {PoolModifyPositionTest} from "@uniswap/v4-core/contracts/test/PoolModifyPositionTest.sol";

import {console} from "forge-std/console.sol";

contract TestLiquisafeHook is Test, Deployers, TokenFixture {
    using PoolIdLibrary for PoolKey;

    /// @dev The minimum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**-128
    int24 internal constant MIN_TICK = -887272;
    /// @dev The maximum tick that may be passed to #getSqrtRatioAtTick computed from log base 1.0001 of 2**128
    int24 internal constant MAX_TICK = -MIN_TICK;

    uint160 constant SQRT_RATIO_10_1 = 250541448375047931186413801569;

    INonfungiblePositionManager public constant uniswapV3PositionManager =
        INonfungiblePositionManager(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);

    IUniswapV3Factory public constant uniswapV3Factory =
        IUniswapV3Factory(0x1F98431c8aD98523631AE4a59f267346ea31F984);

    TestERC20 token0;
    TestERC20 token1;

    PoolModifyPositionTest modifyPositionRouter;

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

        modifyPositionRouter = new PoolModifyPositionTest(
            IPoolManager(address(manager))
        );

        address pool = uniswapV3Factory.createPool(
            address(token0),
            address(token1),
            poolFee
        );
        IUniswapV3Pool(pool).initialize(SQRT_RATIO_1_1);

        token0.approve(address(liquisafeHook), type(uint256).max);
        token1.approve(address(liquisafeHook), type(uint256).max);
        token0.approve(address(swapRouter), type(uint256).max);
        token1.approve(address(swapRouter), type(uint256).max);
        token0.approve(address(uniswapV3PositionManager), type(uint256).max);
        token1.approve(address(uniswapV3PositionManager), type(uint256).max);

        token0.mint(address(this), 10000 ether);
        token1.mint(address(this), 10000 ether);
    }

    function test_AddLiquidity() public {
        uint256 tokenId = _mintPositionV3(15 ether, 1 ether, alice);

        assertGt(tokenId, 0);
        _addPositionV4();
    }

    function test_Execute() public {
        // create liquidities
        uint256 tokenId = _mintPositionV3(15 ether, 1 ether, alice);

        assertGt(tokenId, 0);
        _addPositionV4();

        uint256 aliceBal = token0.balanceOf(alice);
        uint256 aliceBal1 = token1.balanceOf(alice);
        assertEq(aliceBal, 0);
        assertEq(aliceBal1, 0);

        bool zeroForOne = true;

        vm.startPrank(alice);
        // add order
        uniswapV3PositionManager.setApprovalForAll(
            address(liquisafeHook),
            true
        );
        int24 tick = 100;
        int24 tickLower = liquisafeHook.placeLiquidity(
            key,
            tick,
            zeroForOne,
            tokenId
        );

        vm.stopPrank();
        assertEq(tickLower, 60);

        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: !zeroForOne,
            amountSpecified: 1 ether,
            sqrtPriceLimitX96: TickMath.MAX_SQRT_RATIO - 1
        });

        PoolSwapTest.TestSettings memory testSettings = PoolSwapTest
            .TestSettings({withdrawTokens: true, settleUsingTransfer: true});

        swapRouter.swap(key, params, testSettings, "");
        aliceBal = token0.balanceOf(alice);
        aliceBal1 = token1.balanceOf(alice);
        // alice get the token from the liquidity
        assertGt(aliceBal, 0);
        assertGt(aliceBal1, 0);
    }

    function _addPositionV4() private {
        // Approve the modifyPositionRouter to spend your tokens
        token0.approve(address(modifyPositionRouter), 100 ether);
        token1.approve(address(modifyPositionRouter), 100 ether);

        // Add liquidity across different tick ranges
        // First, from -60 to +60
        // Then, from -120 to +120
        // Then, from minimum possible tick to maximum possible tick

        // Add liquidity from -60 to +60
        modifyPositionRouter.modifyPosition(
            key,
            IPoolManager.ModifyPositionParams(-60, 60, 10 ether),
            ""
        );

        // Add liquidity from -120 to +120
        modifyPositionRouter.modifyPosition(
            key,
            IPoolManager.ModifyPositionParams(-120, 120, 10 ether),
            ""
        );

        // Add liquidity from minimum tick to maximum tick
        modifyPositionRouter.modifyPosition(
            key,
            IPoolManager.ModifyPositionParams(
                TickMath.minUsableTick(60),
                TickMath.maxUsableTick(60),
                50 ether
            ),
            ""
        );

        // Approve the tokens for swapping through the swapRouter
        token0.approve(address(swapRouter), 100 ether);
        token1.approve(address(swapRouter), 100 ether);
    }

    function _mintPositionV3(
        uint256 amount0ToMint,
        uint256 amount1ToMint,
        address recipient
    ) private returns (uint256) {
        address pool = uniswapV3Factory.getPool(
            address(token0),
            address(token1),
            poolFee
        );

        int24 tick = IUniswapV3Pool(pool).tickSpacing();

        INonfungiblePositionManager.MintParams
            memory params = INonfungiblePositionManager.MintParams({
                token0: address(token0),
                token1: address(token1),
                fee: poolFee,
                tickLower: getMinTick(tick),
                tickUpper: getMaxTick(tick),
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: recipient,
                deadline: block.timestamp + 100
            });

        // Note that the pool defined by DAI/USDC and fee tier 0.3% must already be created and initialized in order to mint
        (uint256 tokenId, , , ) = uniswapV3PositionManager.mint(params);

        return tokenId;
    }

    function getMinTick(int24 tickSpacing) internal pure returns (int24) {
        return (MIN_TICK / tickSpacing) * tickSpacing;
    }

    function getMaxTick(int24 tickSpacing) internal pure returns (int24) {
        return (MAX_TICK / tickSpacing) * tickSpacing;
    }
}
