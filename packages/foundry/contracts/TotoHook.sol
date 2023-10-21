// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.21;

import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolId, PoolIdLibrary} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";
import {FullMath} from "@uniswap/v4-core/contracts/libraries/FullMath.sol";
import {SafeCast} from "@uniswap/v4-core/contracts/libraries/SafeCast.sol";
import {IERC20Minimal} from "@uniswap/v4-core/contracts/interfaces/external/IERC20Minimal.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {BaseHook} from "./BaseHook.sol";
import {Currency, CurrencyLibrary} from "@uniswap/v4-core/contracts/types/Currency.sol";
import {BalanceDelta} from "@uniswap/v4-core/contracts/types/BalanceDelta.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolKey.sol";

contract TotoHook is BaseHook, ERC1155 {
    // Initialize BaseHook and ERC1155 parent contracts in the constructor
    constructor(
        IPoolManager _poolManager,
        string memory _uri
    ) BaseHook(_poolManager) ERC1155(_uri) {}

    // Required override function for BaseHook to let the PoolManager know which hooks are implemented
    function getHooksCalls() public pure override returns (Hooks.Calls memory) {
        return
            Hooks.Calls({
                beforeInitialize: false,
                afterInitialize: true,
                beforeModifyPosition: false,
                afterModifyPosition: false,
                beforeSwap: false,
                afterSwap: true,
                beforeDonate: false,
                afterDonate: false
            });
    }
}
