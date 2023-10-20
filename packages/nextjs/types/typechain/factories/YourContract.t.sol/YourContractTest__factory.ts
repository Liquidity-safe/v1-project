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
import type { NonPayableOverrides } from "../../common";
import type {
  YourContractTest,
  YourContractTestInterface,
} from "../../YourContract.t.sol/YourContractTest";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "log",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "log_address",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "val",
        type: "uint256[]",
      },
    ],
    name: "log_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256[]",
        name: "val",
        type: "int256[]",
      },
    ],
    name: "log_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "val",
        type: "address[]",
      },
    ],
    name: "log_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "log_bytes",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "log_bytes32",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    name: "log_int",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "val",
        type: "address",
      },
    ],
    name: "log_named_address",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "val",
        type: "uint256[]",
      },
    ],
    name: "log_named_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int256[]",
        name: "val",
        type: "int256[]",
      },
    ],
    name: "log_named_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "val",
        type: "address[]",
      },
    ],
    name: "log_named_array",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "val",
        type: "bytes",
      },
    ],
    name: "log_named_bytes",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "val",
        type: "bytes32",
      },
    ],
    name: "log_named_bytes32",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "val",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "log_named_decimal_int",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "val",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "log_named_decimal_uint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "val",
        type: "int256",
      },
    ],
    name: "log_named_int",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "val",
        type: "string",
      },
    ],
    name: "log_named_string",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "val",
        type: "uint256",
      },
    ],
    name: "log_named_uint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "log_string",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "log_uint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "logs",
    type: "event",
  },
  {
    inputs: [],
    name: "IS_TEST",
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
    name: "excludeArtifacts",
    outputs: [
      {
        internalType: "string[]",
        name: "excludedArtifacts_",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "excludeContracts",
    outputs: [
      {
        internalType: "address[]",
        name: "excludedContracts_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "excludeSenders",
    outputs: [
      {
        internalType: "address[]",
        name: "excludedSenders_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "failed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "targetArtifactSelectors",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "bytes4[]",
            name: "selectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct StdInvariant.FuzzSelector[]",
        name: "targetedArtifactSelectors_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetArtifacts",
    outputs: [
      {
        internalType: "string[]",
        name: "targetedArtifacts_",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetContracts",
    outputs: [
      {
        internalType: "address[]",
        name: "targetedContracts_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetInterfaces",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "string[]",
            name: "artifacts",
            type: "string[]",
          },
        ],
        internalType: "struct StdInvariant.FuzzInterface[]",
        name: "targetedInterfaces_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetSelectors",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "bytes4[]",
            name: "selectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct StdInvariant.FuzzSelector[]",
        name: "targetedSelectors_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetSenders",
    outputs: [
      {
        internalType: "address[]",
        name: "targetedSenders_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "testMessageOnDeployment",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "testSetNewMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "yourContract",
    outputs: [
      {
        internalType: "contract YourContract",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461002d57600160ff1981816007541617600755600b541617600b55611bf190816100338239f35b600080fdfe60808060405260043610156200001457600080fd5b600090813560e01c9081630a9254e41462000e8d57508063101d28e41462000e625780631ed7831c1462000ddc5780632ade38801462000b2f5780633e5e3c231462000aa95780633f7286f41462000a2357806363d2ea6d14620009aa57806366d9a9a01462000814578063831eca4114620006cd57806385226c81146200058d578063916a17c61462000311578063b5508aa914620001bd578063ba414fa61462000194578063e20c9f7114620000fd5763fa7626d414620000d657600080fd5b34620000fa5780600319360112620000fa57602060ff600754166040519015158152f35b80fd5b5034620000fa5780600319360112620000fa57604051601380548083529083526020808301937f66de8ffda797e3de9c05e8fc57b3bf0ec28a930d40b0d285d93c06501cf6a09092915b82821062000173576200016f85620001628189038262001175565b6040519182918262000f9d565b0390f35b83546001600160a01b03168652948501946001938401939091019062000147565b5034620000fa5780600319360112620000fa576020620001b3620011b5565b6040519015158152f35b5034620000fa5780600319360112620000fa57601754620001de81620012c7565b620001ed604051918262001175565b81815260209182820160176000527fc624b66cc0138b8fabc209247f72d758e1cf3343756d543badbf24212bed8c15906000905b8382106200023957604051806200016f8782620010c4565b60405160009184549160019280841c90848116801562000306575b8b83108114620002f2578284528b949392918115620002d4575060011462000297575b506200028881600196038262001175565b81520193019101909162000221565b60008881528481209650905b808210620002bc57508101830194506200028862000277565b8654838301860152958501958b9490910190620002a3565b60ff19168584015250151560051b8101830194506200028862000277565b634e487b7160e01b87526022600452602487fd5b91607f169162000254565b5034620000fa5780600319360112620000fa57601a546200033281620012c7565b9062000342604051928362001175565b808252601a8352827f057c384a7d1c54f3a1b2e5e67b2617b8224fdfd1ea7234eea573a6ff665ff63e602084015b8383106200038857604051806200016f878262001008565b604051620003968162001142565b82546001600160a01b031681526040516001840180548083529089526020808a20908301918a915b8160078401106200051d57846001979460029794602097946200042c94549181811062000500575b818110620004e3575b818110620004c6575b818110620004a9575b8181106200048c575b8181106200046f575b81811062000454575b106200043f575b50038262001175565b8382015281520192019201919062000370565b6001600160e01b031916815286013862000423565b828a1b6001600160e01b0319168452928901928b016200041c565b604083901b6001600160e01b0319168452928901928b0162000413565b606083901b6001600160e01b0319168452928901928b016200040a565b608083901b6001600160e01b0319168452928901928b0162000401565b60a083901b6001600160e01b0319168452928901928b01620003f8565b60c083901b6001600160e01b0319168452928901928b01620003ef565b60e083901b6001600160e01b0319168452928901928b01620003e6565b926001610100600892865463ffffffff60e01b90818160e01b16835260c08282821b16602085015260a08383821b166040860152606084846080928282851b16818a01521b1690860152838360401b1690850152828260201b16908401521660e0820152019401920191620003be565b5034620000fa5780600319360112620000fa57601854620005ae81620012c7565b620005bd604051918262001175565b81815260209182820160186000527fb13d2d76d1f4b7be834882e410b3e3a8afaf69f83600ae24db354391d2378d2e906000905b8382106200060957604051806200016f8782620010c4565b60405160009184549160019280841c908481168015620006c2575b8b83108114620002f2578284528b949392918115620006a4575060011462000667575b506200065881600196038262001175565b815201930191019091620005f1565b60008881528481209650905b8082106200068c57508101830194506200065862000647565b8654838301860152958501958b949091019062000673565b60ff19168584015250151560051b8101830194506200065862000647565b91607f169162000624565b5034620000fa5780600319360112620000fa57601c546001600160a01b0391908216803b156200081057818091606460405180948193635209b43160e11b835260206004840152601860248401527f4c6561726e2053636166666f6c642d455448203221203a29000000000000000060448401525af18015620007d657620007e1575b509081600491601c5416604051928380926303bda43360e61b82525afa8015620007d6577f02de0d935aa8bae86215156624c63bb7462adc4d22b2c49574e4ad33da36ce31918391620007af575b506020815191012003620000fa5780f35b620007cf91503d8085833e620007c6818362001175565b810190620012e0565b386200079e565b6040513d84823e3d90fd5b67ffffffffffffffff8111620007fc57604052600462000750565b634e487b7160e01b82526041600452602482fd5b5080fd5b5034620000fa5780600319360112620000fa576019546200083581620012c7565b9062000845604051928362001175565b80825260198352827f944998273e477b495144fb8794c914197f3ccb46be2900f4698fd0ef743c9695602084015b8383106200088b57604051806200016f878262001008565b604051620008998162001142565b82546001600160a01b031681526040516001840180548083529089526020808a20908301918a915b8160078401106200093a5784600197946002979460209794620009279454918181106200050057818110620004e357818110620004c657818110620004a9578181106200048c578181106200046f578181106200045457106200043f5750038262001175565b8382015281520192019201919062000873565b926001610100600892865463ffffffff60e01b90818160e01b16835260c08282821b16602085015260a08383821b166040860152606084846080928282851b16818a01521b1690860152838360401b1690850152828260201b16908401521660e0820152019401920191620008c1565b5034620000fa5780600319360112620000fa57601c546040516303bda43360e61b8152908290829060049082906001600160a01b03165afa8015620007d6577ffc2e1998e4fabd980b592d3f2694fda3ebc824815a4fa29092582e825411fd0a918391620007af57506020815191012003620000fa5780f35b5034620000fa5780600319360112620000fa57604051601580548083529083526020808301937f55f448fdea98c4d29eb340757ef0a66cd03dbb9538908a6a81d96026b71ec47592915b82821062000a88576200016f85620001628189038262001175565b83546001600160a01b03168652948501946001938401939091019062000a6d565b5034620000fa5780600319360112620000fa57604051601680548083529083526020808301937fd833147d7dc355ba459fc788f669e58cfaf9dc25ddcd0702e87d69c7b512428992915b82821062000b0e576200016f85620001628189038262001175565b83546001600160a01b03168652948501946001938401939091019062000af3565b5034620000fa5780600319360112620000fa57601b549062000b5182620012c7565b62000b60604051918262001175565b828152602081018093601b84527f3ad8aa4f87544323a9d1e5dd902f40c356527a7955687113db5f9a85ad579dc184925b82841062000c8057858588604051916020830190602084525180915260408301600590604083831b860101939580925b84841062000bcf5786860387f35b9091929394603f198782030184528751906020604082019260018060a01b03815116835201519160406020830152825180915260609060208284019282871b850101940192865b82811062000c3b57505050505060208060019299019401940192969493919062000bc1565b909192939460208080600193605f19878203018952895162000c698151809281855285808601910162000fe3565b601f01601f19160101970195019392910162000c16565b60405162000c8e8162001142565b82546001600160a01b031681526001830180549062000cad82620012c7565b9162000cbd604051938462001175565b80835260208301918a5260208a208a925b82841062000cf657505050506001928260209283600295015281520192019301929062000b91565b60405182548d90600181811c919081161562000dd1575b60208210600182161462000dbc578184528f91906001811690811562000d96575060011462000d5d575b50506001928262000d4e8594602094038262001175565b81520192019301929062000cce565b909150848252602082205b81831062000d7f57505081016020018d8262000d37565b600181602092548386880101520192019162000d68565b60ff191660208681019190915291151560051b850190910192508f915083905062000d37565b50634e487b7160e01b8f52602260045260248ffd5b90607f169062000d0d565b5034620000fa5780600319360112620000fa57604051601480548083529083526020808301937fce6d7b5282bd9a3661ae061feed1dbda4e52ab073b1f9285be6e155d9c38d4ec92915b82821062000e41576200016f85620001628189038262001175565b83546001600160a01b03168652948501946001938401939091019062000e26565b5034620000fa5780600319360112620000fa57601c546040516001600160a01b039091168152602090f35b90503462000810578160031936011262000810576001625e79b760e01b0319815260016004820152602081602481737109709ecfa91a80626ff3989d68f67f5b1dd12d5afa908115620007d657829162000f55575b5060405161086a8082019082821067ffffffffffffffff83111762000f415760209183916200135283396001600160a01b03948516815203019083f08015620007d657166bffffffffffffffffffffffff60a01b601c541617601c5580f35b634e487b7160e01b85526041600452602485fd5b90506020813d821162000f94575b8162000f726020938362001175565b810103126200081057516001600160a01b038116810362000810573862000ee2565b3d915062000f63565b6020908160408183019282815285518094520193019160005b82811062000fc5575050505090565b83516001600160a01b03168552938101939281019260010162000fb6565b60005b83811062000ff75750506000910152565b818101518382015260200162000fe6565b602080820190808352835180925260409283810182858560051b840101960194600080935b8685106200104057505050505050505090565b909192939480969798603f198382030186528951826060818885019360018060a01b038151168652015193888382015284518094520192019085905b8082106200109f5750505090806001929a0195019501939695949291906200102d565b82516001600160e01b03191684528a949384019390920191600191909101906200107c565b602080820190808352835180925260408301928160408460051b8301019501936000915b848310620010f95750505050505090565b909192939495848080600193603f198682030187528a51620011278151809281855285808601910162000fe3565b601f01601f19160101980196959491909101920190620010e8565b6040810190811067ffffffffffffffff8211176200115f57604052565b634e487b7160e01b600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff8211176200115f57604052565b67ffffffffffffffff81116200115f57601f01601f191660200190565b60075460081c60ff1615620011d05760ff60075460081c1690565b6000737109709ecfa91a80626ff3989d68f67f5b1dd12d803b620011f2575090565b60408051602081018381526519985a5b195960d21b82840152918152606081019067ffffffffffffffff82118183101762000f41579184826200126c60248397959684976040526080810195630667f9d760e41b87526200125b82518092608485019062000fe3565b810103600481018452018262001175565b51925af1503d15620012bf573d620012848162001198565b9062001294604051928362001175565b81523d82602083013e5b602081805181010312620008105760200151908115158203620000fa575090565b60606200129e565b67ffffffffffffffff81116200115f5760051b60200190565b6020818303126200134c5780519067ffffffffffffffff82116200134c570181601f820112156200134c578051620013188162001198565b9262001328604051948562001175565b818452602082840101116200134c5762001349916020808501910162000fe3565b90565b600080fdfe60a03461011057601f61086a38819003918201601f19168301916001600160401b038311848410176101155780849260209460405283398101031261011057516001600160a01b038116810361011057600080546001908181811c91168015610106575b60208210146100f257601f81116100c6575b507f4275696c64696e6720556e73746f707061626c652041707073212121000000388255805460ff1916905560025560805260405161073e908161012c82396080518181816104cc01526105110152f35b82805281601f60208520920160051c8201915b8281106100e7575050610075565b8481550182906100d9565b634e487b7160e01b83526022600452602483fd5b90607f1690610063565b600080fd5b634e487b7160e01b600052604160045260246000fdfe608060409080825260049081361015610023575b505050361561002157600080fd5b005b600091823560e01c9182633ccfd60b146104fb575081638da5cb5b146104b757816397feba9d14610498578163a4136862146101d3578163cea49c3c1461019457508063e0a73a931461016c5763ef690cc0146100805780610013565b34610169578060031936011261016957815191828283546100a08161063f565b908184526020956001918783821691826000146101425750506001146100e7575b5050506100e392916100d49103856105eb565b51928284938452830190610679565b0390f35b91908693508280527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5635b82841061012a57505050820101816100d46100e36100c1565b8054848a018601528895508794909301928101610111565b60ff19168782015293151560051b860190930193508492506100d491506100e390506100c1565b80fd5b50903461019057816003193601126101905760209060ff6001541690519015158152f35b5080fd5b839150346101cf5760203660031901126101cf57356001600160a01b038116908190036101cf57828291602094526003845220549051908152f35b8280fd5b60209150833660031901831361049457813567ffffffffffffffff9283821161049057366023830112156104905781810135938660249361021387610623565b96610220875198896105eb565b808852368682840101116101cf5780868a9301838a01378701015283518481018181108382111761047e578552601481527353657474696e67206e6577206772656574696e6760601b87820152610276906106b9565b61027f856106b9565b845190811161046c57610292875461063f565b601f811161040b575b508086601f821160011461038c578891610381575b508160011b916000199060031b1c19161786555b6002549160019283810180911161036f57600255338752600386528387209081549284840180941161035e575050557f94cbd7e04dca26a7667654f6448b2ca0a40fec602118dc5fd8c82b9cf3c645ad9291859134158015919061035157805460ff1916811790555b610341825194606086526060860190610679565b958401528201528033930390a280f35b805460ff1916905561032d565b634e487b7160e01b89526011905287fd5b50634e487b7160e01b87526011825286fd5b9050850151886102b0565b8880527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5639150601f198316895b898282106103f557505090836001949392106103dc575b5050811b0186556102c4565b87015160001960f88460031b161c1916905588806103d0565b600184958293958c0151815501940192016103b9565b8780527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563601f830160051c810191888410610462575b601f0160051c01905b818110610457575061029b565b88815560010161044a565b9091508190610441565b50634e487b7160e01b86526041905284fd5b634e487b7160e01b8952604184528489fd5b8580fd5b8380fd5b8284346101905781600319360112610190576020906002549051908152f35b828434610190578160031936011261019057517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b84919250346104945783600319360112610494577f0000000000000000000000000000000000000000000000000000000000000000906001600160a01b03821633036105ba5750838080809347905af13d156105b5573d61055b81610623565b90610568845192836105eb565b81528460203d92013e5b1561057b578280f35b906020606492519162461bcd60e51b835282015260146024820152732330b4b632b2103a379039b2b7321022ba3432b960611b6044820152fd5b610572565b62461bcd60e51b8152602084820152600d60248201526c2737ba103a34329027bbb732b960991b6044820152606490fd5b90601f8019910116810190811067ffffffffffffffff82111761060d57604052565b634e487b7160e01b600052604160045260246000fd5b67ffffffffffffffff811161060d57601f01601f191660200190565b90600182811c9216801561066f575b602083101461065957565b634e487b7160e01b600052602260045260246000fd5b91607f169161064e565b919082519283825260005b8481106106a5575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201610684565b600080916040516106f5816106e7602082019463104c13eb60e21b8652602060248401526044830190610679565b03601f1981018352826105eb565b51906a636f6e736f6c652e6c6f675afa5056fea2646970667358221220bf2dc7cb76c39f1fbbd9f4d15a73307a1f1482da44e33f5e3480c4cd4fe5cc0464736f6c63430008150033a2646970667358221220c1a421f757e0a1fbab7814baeab44a32551ddb20bea13df0679eea8fd2cad1e264736f6c63430008150033";

type YourContractTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YourContractTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YourContractTest__factory extends ContractFactory {
  constructor(...args: YourContractTestConstructorParams) {
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
      YourContractTest & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): YourContractTest__factory {
    return super.connect(runner) as YourContractTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YourContractTestInterface {
    return new Interface(_abi) as YourContractTestInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): YourContractTest {
    return new Contract(address, _abi, runner) as unknown as YourContractTest;
  }
}
