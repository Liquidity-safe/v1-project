/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ContextUpgradeable,
  ContextUpgradeableInterface,
} from "../ContextUpgradeable";

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
] as const;

export class ContextUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): ContextUpgradeableInterface {
    return new Interface(_abi) as ContextUpgradeableInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ContextUpgradeable {
    return new Contract(address, _abi, runner) as unknown as ContextUpgradeable;
  }
}
