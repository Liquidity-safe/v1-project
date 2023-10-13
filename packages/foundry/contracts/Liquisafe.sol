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

	error NotAContract();

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
}
