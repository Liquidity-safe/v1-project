/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { PriceOracle, PriceOracleInterface } from "../PriceOracle";

const _abi = [
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAContract",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "CONTROLLER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "priceFeed",
        type: "address",
      },
    ],
    name: "addPriceFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "dataFeeds",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "exist",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getAssetPriceInUsd",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "relativeTo",
        type: "address",
      },
    ],
    name: "getAssetPriceRelativeTo",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "removePriceFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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

const _bytecode =
  "0x6080806040523461001657610c61908161001c8239f35b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c91826301ffc9a7146107d157508163092c5b3b14610796578163248a9ca31461075e5781632f2ff15d1461073457816336568abe146106ee5781634dfefc4b146106b25781636ff5c519146105ce5781638129fc1c1461048b57816391d1485414610437578163a217fddf1461041c578163a695f60e1461021d578163d547741f146101d0578163e086114b14610196578163e8a97a3e14610112575063fceb0024146100ca57600080fd5b3461010e57602036600319011261010e576100e361083f565b6100eb6108f2565b6001600160a01b031682526020829052812080546001600160a01b031916905580f35b5080fd5b9190503461019257806003193601126101925761012d61083f565b90610136610824565b9261013f6108f2565b823b158015610189575b61017b575060018060a01b03809216845283602052832091166bffffffffffffffffffffffff60a01b82541617905580f35b90516309ee12d560e01b8152fd5b50833b15610149565b8280fd5b50503461010e57602036600319011261010e576020916001600160a01b03908290826101c061083f565b1681528085522054169051908152f35b91905034610192578060031936011261019257610219913561021460016101f5610824565b93838752600080516020610c0c8339815191526020528620015461096c565b610b88565b5080f35b9050823461041957826003193601126104195761023861083f565b90610241610824565b6001600160a01b0392831682526020828152858320549184168352858320548651633fabe5a360e21b808252909692959384169460a094909392169084888481895afa9788156103b75784986103f5575b50885190815284818481855afa9485156103b75784956103c1575b50508751948686848163313ce56760e01b948582525afa9586156103b7579087918597610398575b50838a518094819382525afa90811561038e579060ff918491610361575b5016604d811161034e57600a0a9586810296818804149015171561033b57821561032857505084519304835260ff1690820152f35b634e487b7160e01b825260129052602490fd5b634e487b7160e01b825260119052602490fd5b634e487b7160e01b835260118252602483fd5b6103819150873d8911610387575b6103798183610855565b8101906108d9565b896102f3565b503d61036f565b88513d85823e3d90fd5b6103b0919750823d8411610387576103798183610855565b958a6102d5565b89513d86823e3d90fd5b6103e1929550803d106103ee575b6103d98183610855565b8101906108a4565b50505090509288806102ad565b503d6103cf565b61040d919850853d87116103ee576103d98183610855565b50505090509689610292565b80fd5b50503461010e578160031936011261010e5751908152602090f35b9050346101925781600319360112610192578160209360ff92610458610824565b90358252600080516020610c0c83398151915286528282206001600160a01b039091168252855220549151911615158152f35b9050346101925782600319360112610192577ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a009081549060ff82851c16159167ffffffffffffffff8116801590816105c6575b60011490816105bc575b1590816105b3575b506105a45767ffffffffffffffff198116600117845582610585575b5060ff8354851c161561057757506105233361099f565b5061052d33610a3f565b50610536578280f35b805468ff00000000000000001916905551600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d290602090a138808280f35b8351631afcd79f60e31b8152fd5b68ffffffffffffffffff1916680100000000000000011783553861050c565b50835163f92ee8a960e01b8152fd5b905015386104f0565b303b1591506104e8565b8491506104de565b905034610192576020806003193601126106ae576001600160a01b03806105f361083f565b168552848252838520548451633fabe5a360e21b815293911660a0848381845afa9384156106a457869461067d575b50829085519283809263313ce56760e01b82525afa908115610673579060ff918691610656575b5084519384521690820152f35b61066d9150833d8511610387576103798183610855565b85610649565b84513d87823e3d90fd5b839194506106989060a03d81116103ee576103d98183610855565b50505090509390610622565b85513d88823e3d90fd5b8380fd5b50503461010e57602036600319011261010e576020916001600160a01b03908290826106dc61083f565b16815280855220541615159051908152f35b83833461010e578060031936011261010e57610708610824565b90336001600160a01b038316036107255750610219919235610b88565b5163334bd91960e11b81528390fd5b91905034610192578060031936011261019257610219913561075960016101f5610824565b610b01565b9050346101925760203660031901126101925781602093600192358152600080516020610c0c83398151915285522001549051908152f35b50503461010e578160031936011261010e57602090517f7b765e0e932d348852a6f810bfa1ab891e259123f02db8cdcde614c5702233578152f35b849134610192576020366003190112610192573563ffffffff60e01b81168091036101925760209250637965db0b60e01b8114908115610813575b5015158152f35b6301ffc9a760e01b1490508361080c565b602435906001600160a01b038216820361083a57565b600080fd5b600435906001600160a01b038216820361083a57565b90601f8019910116810190811067ffffffffffffffff82111761087757604052565b634e487b7160e01b600052604160045260246000fd5b519069ffffffffffffffffffff8216820361083a57565b908160a091031261083a576108b88161088d565b916020820151916040810151916108d660806060840151930161088d565b90565b9081602091031261083a575160ff8116810361083a5790565b3360009081527f6a9e2d30c9502d2e64654936f9966c37f5208e723166202f23831d0d37f1338360205260409020547f7b765e0e932d348852a6f810bfa1ab891e259123f02db8cdcde614c5702233579060ff161561094e5750565b6044906040519063e2517d3f60e01b82523360048301526024820152fd5b80600052600080516020610c0c83398151915260205260406000203360005260205260ff604060002054161561094e5750565b6001600160a01b031660008181527fb7db2dd08fcb62d0c9e08c51941cae53c267786a0b75803fb7960902fc8ef97d6020526040812054909190600080516020610c0c8339815191529060ff16610a3a578280526020526040822081835260205260408220600160ff1982541617905533917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d8180a4600190565b505090565b6001600160a01b031660008181527f6a9e2d30c9502d2e64654936f9966c37f5208e723166202f23831d0d37f1338360205260408120549091907f7b765e0e932d348852a6f810bfa1ab891e259123f02db8cdcde614c57022335790600080516020610c0c8339815191529060ff16610afb578184526020526040832082845260205260408320600160ff198254161790557f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d339380a4600190565b50505090565b90600091808352600080516020610c0c83398151915280602052604084209260018060a01b03169283855260205260ff60408520541615600014610afb578184526020526040832082845260205260408320600160ff198254161790557f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d339380a4600190565b90600091808352600080516020610c0c83398151915280602052604084209260018060a01b03169283855260205260ff604085205416600014610afb57818452602052604083208284526020526040832060ff1981541690557ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b339380a460019056fe02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800a2646970667358221220a92669bb85947042a90580c94ecc956d37652b08d02bb68e54b323bf783b7a3a64736f6c63430008150033";

type PriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PriceOracle__factory extends ContractFactory {
  constructor(...args: PriceOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      PriceOracle & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): PriceOracle__factory {
    return super.connect(runner) as PriceOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PriceOracleInterface {
    return new Interface(_abi) as PriceOracleInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): PriceOracle {
    return new Contract(address, _abi, runner) as unknown as PriceOracle;
  }
}
