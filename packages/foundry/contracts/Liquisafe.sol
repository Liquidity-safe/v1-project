// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.21;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./interfaces/IPriceOracle.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IWETH.sol";
import "./libraries/TransferHelper.sol";

contract Liquisafe is Initializable, AccessControlUpgradeable, IPriceOracle {
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
		address token0;
		address token1;
		uint256 positionId;
		uint256 amountLiquidity;
		uint128 minAmountToken0;
		uint128 minAmountToken1;
	}

	Order[] public allOrders;

	mapping(address-> bool) authorizedFactories;

	event Add(
		address indexed sender,
		address indexed receiver,
		uint256 indexed orderIndex,
		Order order
	);

	error NotAContract();
	error UnauthorizedFactory();
	error NoPoolFound();
	error IncorrectToken();

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

	function setFactory(address factory, bool authorized) external onlyRole(CONTROLLER_ROLE){
		if (!_isContract(factory)) {
			revert NotAContract();
		}
		authorizedFactories[factory]=authorized;
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
		address tokenA,
		address tokenB,
		uint256 positionId,
		uint256 amountLiquidity,
		uint128 minAmountTokenA,
		uint128 minAmountTokenB
	) external {
		if (!authorizedFactories[factory]) {
			revert UnauthorizedFactory();
		}
		if(tokenA != tokenB || tokenA == address(0)){
			revert IncorrectToken();
		}

		address pool;
		if(orderType.UniV2){
			pool = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
		}
		else if(orderType.UniV3){
			
		}else if(orderType.UniV4){

		}

		if (pool == address(0)) {
			revert NoPoolFound();
		}

        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);

		Order newOrder = new Order(OrderStatus.Active,orderType, orderRole,msg.sender,receiver,pool,token0,token1,positionId,amountLiquidity,minAmountToken0,minAmountToken1);
		allOrders.push(newOrder);
	
		emit Add(msg.sender, receiver, allOrders.length - 1 , newOrder);
	}


	function _isContract(address addr) private view returns (bool) {
		uint256 size;
		assembly {
			size := extcodesize(addr)
		}
		return size > 0;
	}
}
