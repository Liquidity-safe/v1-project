/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ERC165Upgradeable,
  ERC165UpgradeableInterface,
} from "../ERC165Upgradeable";

const _abi = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ERC165Upgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): ERC165UpgradeableInterface {
    return new Interface(_abi) as ERC165UpgradeableInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC165Upgradeable {
    return new Contract(address, _abi, runner) as unknown as ERC165Upgradeable;
  }
}
