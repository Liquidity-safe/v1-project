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

export interface VerifyAllInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "IS_SCRIPT"
      | "getTransactionFromRaw"
      | "nextTransaction"
      | "run"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "IS_SCRIPT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getTransactionFromRaw",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nextTransaction",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "run", values?: undefined): string;

  decodeFunctionResult(functionFragment: "IS_SCRIPT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTransactionFromRaw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nextTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "run", data: BytesLike): Result;
}

export interface VerifyAll extends BaseContract {
  connect(runner?: ContractRunner | null): VerifyAll;
  waitForDeployment(): Promise<this>;

  interface: VerifyAllInterface;

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

  getTransactionFromRaw: TypedContractMethod<
    [content: string, idx: BigNumberish],
    [void],
    "view"
  >;

  nextTransaction: TypedContractMethod<[content: string], [boolean], "view">;

  run: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "IS_SCRIPT"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "getTransactionFromRaw"
  ): TypedContractMethod<[content: string, idx: BigNumberish], [void], "view">;
  getFunction(
    nameOrSignature: "nextTransaction"
  ): TypedContractMethod<[content: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "run"
  ): TypedContractMethod<[], [void], "nonpayable">;

  filters: {};
}
