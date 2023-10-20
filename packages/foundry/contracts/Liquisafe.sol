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
import "./interfaces/uni-v3/periphery/INonfungiblePositionManager.sol";

//import {console} from "forge-std/console.sol";

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

    event Executed(
        address indexed sender,
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
    error NotOwner();

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

    // management part

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

    function removeNonfungiblePositionManager(
        address factory
    ) external onlyRole(CONTROLLER_ROLE) {
        nonFungiblePositionManagers[factory] = address(0);
    }

    function updatePriceOracle(
        address _priceOracle
    ) external onlyRole(CONTROLLER_ROLE) {
        if (!_isContract(_priceOracle)) {
            revert NotAContract();
        }
        priceOracle = IPriceOracle(_priceOracle);
    }

    //  orders CRUD

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
        if (token0 > token1 || token0 == address(0)) {
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

        // simply add order, user don't deposit liquidity in the contract
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

    function executeOrders(
        uint256[] calldata orderIndexes
    ) external returns (bool[] memory executed) {
        executed = new bool[](orderIndexes.length);
        for (uint256 i = 0; i < orderIndexes.length; i++) {
            uint256 index = orderIndexes[i];
            Order memory order = allOrders[index];
            // don't threat if not possible
            if (_canExecuteOrder(order)) {
                _executeOrder(order);
                allOrders[index].orderStatus = OrderStatus.Executed;
                executed[index] = true;
                emit Executed(msg.sender, index, order);
            } else {
                executed[index] = false;
            }
        }
    }

    function cancelOrder(uint256 index) external {
        Order storage order = allOrders[index];
        if (order.owner != msg.sender) {
            revert NotOwner();
        }

        if (order.orderStatus != OrderStatus.Active) {
            revert OrderNotActive();
        }

        order.orderStatus = OrderStatus.Canceled;
    }

    // view functions

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function canExecuteOrder(uint256 index) external view returns (bool) {
        Order memory order = allOrders[index];
        return _canExecuteOrder(order);
    }

    function countOrders() external view returns (uint256) {
        return allOrders.length;
    }

    function fetchPageOrders(
        uint256 cursor,
        uint256 howMany
    ) external view returns (Order[] memory values, uint256 newCursor) {
        uint256 length = howMany;
        uint256 orderCount = allOrders.length;
        if (length > orderCount - cursor) {
            length = orderCount - cursor;
        }

        values = new Order[](length);
        for (uint256 i = 0; i < length; i++) {
            Order memory order = allOrders[i];
            values[i] = order;
        }

        return (values, cursor + length);
    }

    function getExecutableOrders(
        uint256[] calldata orderIndexes
    ) external view returns (bool[] memory executed) {
        executed = new bool[](orderIndexes.length);
        for (uint256 i = 0; i < orderIndexes.length; i++) {
            uint256 index = orderIndexes[i];
            Order memory order = allOrders[index];
            // don't threat if not possible
            if (_canExecuteOrder(order)) {
                executed[index] = true;
            } else {
                executed[index] = false;
            }
        }
    }

    // private functions

    function _executeOrder(Order memory order) private {
        if (order.orderType == OrderType.UniV2) {
            IUniswapV2Pair pair = IUniswapV2Pair(order.pool);
            pair.transferFrom(
                order.owner,
                address(pair),
                order.amountLiquidity
            );
            if (order.orderRole == OrderRole.Withdraw) {
                // withdraw token to receiver address
                pair.burn(order.receiver);
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

            nonfungiblePositionManager.decreaseLiquidity(params);

            INonfungiblePositionManager.CollectParams
                memory params2 = INonfungiblePositionManager.CollectParams({
                    tokenId: order.positionId,
                    recipient: address(this),
                    amount0Max: type(uint128).max,
                    amount1Max: type(uint128).max
                });

            (uint256 amount0, uint256 amount1) = nonfungiblePositionManager
                .collect(params2);

            //send liquidity back to owner
            IERC20(order.token0).transfer(order.receiver, amount0);
            IERC20(order.token1).transfer(order.receiver, amount1);
        } else {
            revert NotImplemented();
        }
    }

    function _canExecuteOrder(
        Order memory order
    ) private view returns (bool can) {
        if (order.orderStatus != OrderStatus.Active) {
            revert OrderNotActive();
        }

        // can execute only if price equal or more than trigger price
        if (order.minAmountToken0Usd > 0) {
            (uint256 price, uint256 decimals) = priceOracle.getAssetPriceInUsd(
                order.token0
            );
            uint256 actualPrice = price * 10 ** decimalsUsd;
            uint256 minPrice = order.minAmountToken0Usd * 10 ** decimals;
            if (minPrice >= actualPrice) {
                return true;
            }
        }

        if (order.minAmountToken1Usd > 0) {
            (uint256 price, uint256 decimals) = priceOracle.getAssetPriceInUsd(
                order.token1
            );
            uint256 actualPrice = price * 10 ** decimalsUsd;
            uint256 minPrice = order.minAmountToken1Usd * 10 ** decimals;
            if (minPrice >= actualPrice) {
                return true;
            }
        }

        return false;
    }

    function _isContract(address addr) private view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }
}
