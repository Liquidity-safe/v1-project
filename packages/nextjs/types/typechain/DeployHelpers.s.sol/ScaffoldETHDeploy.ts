/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace StdChains {
  export type ChainStruct = {
    name: string;
    chainId: BigNumberish;
    chainAlias: string;
    rpcUrl: string;
  };

  export type ChainStructOutput = [
    name: string,
    chainId: bigint,
    chainAlias: string,
    rpcUrl: string
  ] & { name: string; chainId: bigint; chainAlias: string; rpcUrl: string };
}

export interface ScaffoldETHDeployInterface extends Interface {
  getFunction(
    nameOrSignature: "IS_SCRIPT" | "deployments" | "findChainName" | "getChain"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "IS_SCRIPT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deployments",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "findChainName",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getChain", values?: undefined): string;

  decodeFunctionResult(functionFragment: "IS_SCRIPT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "findChainName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getChain", data: BytesLike): Result;
}

export interface ScaffoldETHDeploy extends BaseContract {
  connect(runner?: ContractRunner | null): ScaffoldETHDeploy;
  waitForDeployment(): Promise<this>;

  interface: ScaffoldETHDeployInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  IS_SCRIPT: TypedContractMethod<[], [boolean], "view">;

  deployments: TypedContractMethod<
    [arg0: BigNumberish],
    [[string, string] & { name: string; addr: string }],
    "view"
  >;

  findChainName: TypedContractMethod<[], [string], "nonpayable">;

  getChain: TypedContractMethod<
    [],
    [StdChains.ChainStructOutput],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "IS_SCRIPT"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "deployments"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [[string, string] & { name: string; addr: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "findChainName"
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "getChain"
  ): TypedContractMethod<[], [StdChains.ChainStructOutput], "nonpayable">;

  filters: {};
}
