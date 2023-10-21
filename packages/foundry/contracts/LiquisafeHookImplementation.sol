// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {BaseHook} from "./BaseHook.sol";
import {LiquisafeHook} from "./LiquisafeHook.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";

contract LiquisafeHookImplementation is LiquisafeHook {
    constructor(
        IPoolManager _poolManager,
        LiquisafeHook addressToEtch
    ) LiquisafeHook(_poolManager) {
        Hooks.validateHookAddress(addressToEtch, getHooksCalls());
    }

    // make this a no-op in testing
    function validateHookAddress(BaseHook _this) internal pure override {}
}
