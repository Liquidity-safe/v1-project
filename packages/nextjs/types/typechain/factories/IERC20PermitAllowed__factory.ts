/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IERC20PermitAllowed,
  IERC20PermitAllowedInterface,
} from "../IERC20PermitAllowed";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IERC20PermitAllowed__factory {
  static readonly abi = _abi;
  static createInterface(): IERC20PermitAllowedInterface {
    return new Interface(_abi) as IERC20PermitAllowedInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IERC20PermitAllowed {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IERC20PermitAllowed;
  }
}
