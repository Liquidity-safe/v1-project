// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.21;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./interfaces/IPriceOracle.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IWETH.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IUniswapV2Factory.sol";

import "./interfaces/uni-v3/core/IUniswapV3Factory.sol";
import "./interfaces/uni-v3/core/IUniswapV3Pool.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import './interfaces/uni-v3/periphery/INonfungiblePositionManager.sol';

//import "./libraries/TransferHelper.sol";

contract Liquisafe is Initializable, AccessControlUpgradeable, IERC721Receiver {
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");
    uint8 public constant decimalsUsd = 8;

    IPriceOracle public priceOracle;
    IWETH public WETH;

    enum OrderStatus {
        None,
        Active,
        Canceled,
        Executed
    }

    enum OrderType {
        None,
        UniV2,
        UniV3,
        UniV4
    }

    enum OrderRole {
        None,
        Withdraw,
        SwapToken0,
        SwapToken1,
        Swap
    }

    struct Order {
        OrderStatus orderStatus;
        OrderType orderType;
        OrderRole orderRole;
        address owner;
        address receiver;
        address pool;
        address positionManager;
        address token0;
        address token1;
        uint256 positionId;
        uint128 amountLiquidity;
        uint128 minAmountToken0Usd;
        uint128 minAmountToken1Usd;
    }

    Order[] public allOrders;

    mapping(address => bool) public authorizedFactories;
    mapping(address => address) public nonFungiblePositionManagers;

    event Add(
        address indexed sender,
        address indexed receiver,
        uint256 indexed orderIndex,
        Order order
    );

    error NotAContract();
    error UnauthorizedFactory();
    error PoolNotFound();
    error IncorrectToken();
    error OrderNotActive();
    error NotImplemented();
    error InsufficientLiquidity();
    error IncorrectReceiver();
    error IncorrectPositionId();

    function initialize(
        address _priceOracle,
        address _WETH
    ) public initializer {
        if (!_isContract(_priceOracle) || !_isContract(_WETH)) {
            revert NotAContract();
        }

        __AccessControl_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CONTROLLER_ROLE, msg.sender);

        priceOracle = IPriceOracle(_priceOracle);
        WETH = IWETH(_WETH);
    }

    function setFactory(
        address factory,
        bool authorized
    ) external onlyRole(CONTROLLER_ROLE) {
        if (!_isContract(factory)) {
            revert NotAContract();
        }
        authorizedFactories[factory] = authorized;
    }

    function setNonfungiblePositionManager(
        address factory,
        address nonfungiblePositionManager
    ) external onlyRole(CONTROLLER_ROLE) {
        if (!_isContract(nonfungiblePositionManager)) {
            revert NotAContract();
        }
        nonFungiblePositionManagers[factory] = nonfungiblePositionManager;
    }

    function updatePriceOracle(
        address _priceOracle
    ) external onlyRole(CONTROLLER_ROLE) {
        if (!_isContract(_priceOracle)) {
            revert NotAContract();
        }
        priceOracle = IPriceOracle(_priceOracle);
    }

    function addOrder(
        OrderType orderType,
        OrderRole orderRole,
        address receiver,
        address factory,
        address token0,
        address token1,
        uint24 fee,
        uint256 positionId,
        uint128 amountLiquidity,
        uint128 minAmountToken0Usd,
        uint128 minAmountToken1Usd
    ) external {
        if (!authorizedFactories[factory]) {
            revert UnauthorizedFactory();
        }
        if (token0 < token1 || token0 == address(0)) {
            revert IncorrectToken();
        }

        if (receiver == address(0)) {
            revert IncorrectReceiver();
        }

        if (orderRole != OrderRole.Withdraw) {
            revert NotImplemented();
        }

        address pool;
        address positionManager;
        if (orderType == OrderType.UniV2) {
            if (amountLiquidity == 0) {
                revert InsufficientLiquidity();
            }
            pool = IUniswapV2Factory(factory).getPair(token0, token1);
        } else if (orderType == OrderType.UniV3) {
            if (positionId == 0) {
                revert IncorrectPositionId();
            }
            pool = IUniswapV3Factory(factory).getPool(token0, token1, fee);
            positionManager = nonFungiblePositionManagers[factory];
        } else if (orderType == OrderType.UniV4) {
            revert NotImplemented();
        }

        if (pool == address(0)) {
            revert PoolNotFound();
        }

        Order memory newOrder = Order(
            OrderStatus.Active,
            orderType,
            orderRole,
            msg.sender,
            receiver,
            pool,
            positionManager,
            token0,
            token1,
            positionId,
            amountLiquidity,
            minAmountToken0Usd,
            minAmountToken1Usd
        );
        allOrders.push(newOrder);

        emit Add(msg.sender, receiver, allOrders.length - 1, newOrder);
    }

    function executeOrders(uint256[] calldata orderIndexes) external {
        for (uint256 i = 0; i < orderIndexes.length; i++) {
            Order memory order = allOrders[orderIndexes[i]];
            if (_canExecuteOrder(order)) {
                if (order.orderType == OrderType.UniV2) {
                    IERC20(order.pool).transferFrom(
                        order.owner,
                        order.pool,
                        order.amountLiquidity
                    );
                    if (order.orderRole == OrderRole.Withdraw) {
                        // withdraw token to receiver address
                        IUniswapV2Pair(order.pool).burn(order.receiver);
                    }
                } else if (order.orderType == OrderType.UniV3) {
                    INonfungiblePositionManager nonfungiblePositionManager = INonfungiblePositionManager(
                            order.positionManager
                        );
                    // amount0Min and amount1Min are price slippage checks
                    // if the amount received after burning is not greater than these minimums, transaction will fail
                    INonfungiblePositionManager.DecreaseLiquidityParams
                        memory params = INonfungiblePositionManager
                            .DecreaseLiquidityParams({
                                tokenId: order.positionId,
                                liquidity: order.amountLiquidity,
                                amount0Min: 0,
                                amount1Min: 0,
                                deadline: block.timestamp
                            });

                    (uint256 amount0, uint256 amount1) = nonfungiblePositionManager
                        .decreaseLiquidity(params);

                    //send liquidity back to owner
                    IERC20(order.token0).transfer(order.owner, amount0);
                    IERC20(order.token1).transfer(order.owner, amount1);
                } else {
                    revert NotImplemented();
                }
            }
        }
    }

    function onERC721Received(
        address operator,
        address,
        uint256 tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        // get position information
        //_createDeposit(operator, tokenId);
        return this.onERC721Received.selector;
    }

    function canExecuteOrder(uint256 index) external view returns (bool) {
        Order memory order = allOrders[index];
        return _canExecuteOrder(order);
    }

    function _canExecuteOrder(
        Order memory order
    ) private view returns (bool can) {
        if (order.orderStatus != OrderStatus.Active) {
            revert OrderNotActive();
        }

        if (order.minAmountToken0Usd > 0) {
            (uint256 price, uint256 decimals) = priceOracle.getAssetPriceInUsd(
                order.token0
            );
            if (
                (price * 10 ** decimalsUsd) <=
                (order.minAmountToken0Usd * 10 ** decimals)
            ) {
                return true;
            }
        }

        if (order.minAmountToken1Usd > 0) {
            (uint256 price, uint256 decimals) = priceOracle.getAssetPriceInUsd(
                order.token1
            );
            if (
                (price * 10 ** decimalsUsd) <=
                (order.minAmountToken1Usd * 10 ** decimals)
            ) {
                return true;
            }
        }
    }

    function _isContract(address addr) private view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }
}
