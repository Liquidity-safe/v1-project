/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { TempVm, TempVmInterface } from "../../VerifyAll.s.sol/TempVm";

const _abi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    name: "tryFfi",
    outputs: [
      {
        components: [
          {
            internalType: "int32",
            name: "exit_code",
            type: "int32",
          },
          {
            internalType: "bytes",
            name: "stdout",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "stderr",
            type: "bytes",
          },
        ],
        internalType: "struct FfiResult",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class TempVm__factory {
  static readonly abi = _abi;
  static createInterface(): TempVmInterface {
    return new Interface(_abi) as TempVmInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): TempVm {
    return new Contract(address, _abi, runner) as unknown as TempVm;
  }
}
