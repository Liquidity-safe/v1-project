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
} from "./common";

export interface IUniswapV3PoolDerivedStateInterface extends Interface {
  getFunction(
    nameOrSignature: "observe" | "snapshotCumulativesInside"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "observe",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "snapshotCumulativesInside",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "observe", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "snapshotCumulativesInside",
    data: BytesLike
  ): Result;
}

export interface IUniswapV3PoolDerivedState extends BaseContract {
  connect(runner?: ContractRunner | null): IUniswapV3PoolDerivedState;
  waitForDeployment(): Promise<this>;

  interface: IUniswapV3PoolDerivedStateInterface;

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

  observe: TypedContractMethod<
    [secondsAgos: BigNumberish[]],
    [
      [bigint[], bigint[]] & {
        tickCumulatives: bigint[];
        secondsPerLiquidityCumulativeX128s: bigint[];
      }
    ],
    "view"
  >;

  snapshotCumulativesInside: TypedContractMethod<
    [tickLower: BigNumberish, tickUpper: BigNumberish],
    [
      [bigint, bigint, bigint] & {
        tickCumulativeInside: bigint;
        secondsPerLiquidityInsideX128: bigint;
        secondsInside: bigint;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "observe"
  ): TypedContractMethod<
    [secondsAgos: BigNumberish[]],
    [
      [bigint[], bigint[]] & {
        tickCumulatives: bigint[];
        secondsPerLiquidityCumulativeX128s: bigint[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "snapshotCumulativesInside"
  ): TypedContractMethod<
    [tickLower: BigNumberish, tickUpper: BigNumberish],
    [
      [bigint, bigint, bigint] & {
        tickCumulativeInside: bigint;
        secondsPerLiquidityInsideX128: bigint;
        secondsInside: bigint;
      }
    ],
    "view"
  >;

  filters: {};
}
