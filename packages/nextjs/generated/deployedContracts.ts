const contracts = {
  5: [
    {
      name: "Goerli",
      chainId: "5",
      contracts: {
        ProxyAdmin: {
          address: "0xE3051507DB7881fA2B3B1Fd6923211f52aFf646b",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "initialOwner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "OwnableInvalidOwner",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "OwnableUnauthorizedAccount",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [],
              name: "UPGRADE_INTERFACE_VERSION",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "contract ITransparentUpgradeableProxy",
                  name: "proxy",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "implementation",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "upgradeAndCall",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
          ],
        },
        PriceOracle: {
          address: "0x9a1bFf80A98480FD2A82603a474cf65B53Bce82a",
          abi: [
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
          ],
        },
        TransparentUpgradeableProxy: {
          address: "0xC0c73537B0a76aEE7E2B557Ed3D56Ab8DbD0FceA",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_logic",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "initialOwner",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "_data",
                  type: "bytes",
                },
              ],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "target",
                  type: "address",
                },
              ],
              name: "AddressEmptyCode",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "admin",
                  type: "address",
                },
              ],
              name: "ERC1967InvalidAdmin",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "implementation",
                  type: "address",
                },
              ],
              name: "ERC1967InvalidImplementation",
              type: "error",
            },
            {
              inputs: [],
              name: "ERC1967NonPayable",
              type: "error",
            },
            {
              inputs: [],
              name: "FailedInnerCall",
              type: "error",
            },
            {
              inputs: [],
              name: "ProxyDeniedAdminAccess",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "previousAdmin",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newAdmin",
                  type: "address",
                },
              ],
              name: "AdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "implementation",
                  type: "address",
                },
              ],
              name: "Upgraded",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
          ],
        },
        Liquisafe: {
          address: "0xC0c73537B0a76aEE7E2B557Ed3D56Ab8DbD0FceA",
          abi: [
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
              name: "IncorrectPositionId",
              type: "error",
            },
            {
              inputs: [],
              name: "IncorrectReceiver",
              type: "error",
            },
            {
              inputs: [],
              name: "IncorrectToken",
              type: "error",
            },
            {
              inputs: [],
              name: "InsufficientLiquidity",
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
              name: "NotImplemented",
              type: "error",
            },
            {
              inputs: [],
              name: "NotInitializing",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "OrderNotActive",
              type: "error",
            },
            {
              inputs: [],
              name: "PoolNotFound",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint128",
                  name: "",
                  type: "uint128",
                },
              ],
              name: "PositionInsufficientLiquidity",
              type: "error",
            },
            {
              inputs: [],
              name: "PositionManagerNotFound",
              type: "error",
            },
            {
              inputs: [],
              name: "UnauthorizedFactory",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "orderIndex",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "enum Liquisafe.OrderStatus",
                      name: "orderStatus",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderType",
                      name: "orderType",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderRole",
                      name: "orderRole",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "pool",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "positionManager",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token0",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token1",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "positionId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint128",
                      name: "amountLiquidity",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken0Usd",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken1Usd",
                      type: "uint128",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Liquisafe.Order",
                  name: "order",
                  type: "tuple",
                },
              ],
              name: "Add",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "orderIndex",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "enum Liquisafe.OrderStatus",
                      name: "orderStatus",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderType",
                      name: "orderType",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderRole",
                      name: "orderRole",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "pool",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "positionManager",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token0",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token1",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "positionId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint128",
                      name: "amountLiquidity",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken0Usd",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken1Usd",
                      type: "uint128",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Liquisafe.Order",
                  name: "order",
                  type: "tuple",
                },
              ],
              name: "Executed",
              type: "event",
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
              inputs: [],
              name: "WETH",
              outputs: [
                {
                  internalType: "contract IWETH",
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
                  internalType: "enum Liquisafe.OrderRole",
                  name: "orderRole",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "factory",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  internalType: "uint128",
                  name: "amountLiquidity",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken0Usd",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken1Usd",
                  type: "uint128",
                },
              ],
              name: "addOrderV2",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "enum Liquisafe.OrderRole",
                  name: "orderRole",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "factory",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint128",
                  name: "amountLiquidity",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken0Usd",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken1Usd",
                  type: "uint128",
                },
              ],
              name: "addOrderV3",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "allOrders",
              outputs: [
                {
                  internalType: "enum Liquisafe.OrderStatus",
                  name: "orderStatus",
                  type: "uint8",
                },
                {
                  internalType: "enum Liquisafe.OrderType",
                  name: "orderType",
                  type: "uint8",
                },
                {
                  internalType: "enum Liquisafe.OrderRole",
                  name: "orderRole",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "pool",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "positionManager",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "positionId",
                  type: "uint256",
                },
                {
                  internalType: "uint128",
                  name: "amountLiquidity",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken0Usd",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken1Usd",
                  type: "uint128",
                },
              ],
              stateMutability: "view",
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
              name: "authorizedFactories",
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
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "canExecuteOrder",
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
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "cancelOrder",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "countOrders",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimalsUsd",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "orderIndexes",
                  type: "uint256[]",
                },
              ],
              name: "executeOrders",
              outputs: [
                {
                  internalType: "bool[]",
                  name: "executed",
                  type: "bool[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "cursor",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "howMany",
                  type: "uint256",
                },
              ],
              name: "fetchPageOrders",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum Liquisafe.OrderStatus",
                      name: "orderStatus",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderType",
                      name: "orderType",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderRole",
                      name: "orderRole",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "pool",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "positionManager",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token0",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token1",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "positionId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint128",
                      name: "amountLiquidity",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken0Usd",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken1Usd",
                      type: "uint128",
                    },
                  ],
                  internalType: "struct Liquisafe.Order[]",
                  name: "values",
                  type: "tuple[]",
                },
                {
                  internalType: "uint256",
                  name: "newCursor",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "orderIndexes",
                  type: "uint256[]",
                },
              ],
              name: "getExecutableOrders",
              outputs: [
                {
                  internalType: "bool[]",
                  name: "executed",
                  type: "bool[]",
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
              inputs: [
                {
                  internalType: "address",
                  name: "_priceOracle",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_WETH",
                  type: "address",
                },
              ],
              name: "initialize",
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
              name: "nonFungiblePositionManagers",
              outputs: [
                {
                  internalType: "address",
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
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "onERC721Received",
              outputs: [
                {
                  internalType: "bytes4",
                  name: "",
                  type: "bytes4",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "priceOracle",
              outputs: [
                {
                  internalType: "contract IPriceOracle",
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
                  name: "factory",
                  type: "address",
                },
              ],
              name: "removeNonfungiblePositionManager",
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
                  internalType: "address",
                  name: "factory",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "authorized",
                  type: "bool",
                },
              ],
              name: "setFactory",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "factory",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "nonfungiblePositionManager",
                  type: "address",
                },
              ],
              name: "setNonfungiblePositionManager",
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
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_priceOracle",
                  type: "address",
                },
              ],
              name: "updatePriceOracle",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      name: "Anvil",
      chainId: "31337",
      contracts: {
        ProxyAdmin: {
          address: "0x3489745eff9525CCC3d8c648102FE2cf3485e228",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "initialOwner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "OwnableInvalidOwner",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "OwnableUnauthorizedAccount",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [],
              name: "UPGRADE_INTERFACE_VERSION",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "contract ITransparentUpgradeableProxy",
                  name: "proxy",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "implementation",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "upgradeAndCall",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
          ],
        },
        PriceOracle: {
          address: "0x43b9Ef43D415e84aD9964567002d648b11747A8f",
          abi: [
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
          ],
        },
        TransparentUpgradeableProxy: {
          address: "0xbeC6419cD931e29ef41157fe24C6928a0C952f0b",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_logic",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "initialOwner",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "_data",
                  type: "bytes",
                },
              ],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "target",
                  type: "address",
                },
              ],
              name: "AddressEmptyCode",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "admin",
                  type: "address",
                },
              ],
              name: "ERC1967InvalidAdmin",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "implementation",
                  type: "address",
                },
              ],
              name: "ERC1967InvalidImplementation",
              type: "error",
            },
            {
              inputs: [],
              name: "ERC1967NonPayable",
              type: "error",
            },
            {
              inputs: [],
              name: "FailedInnerCall",
              type: "error",
            },
            {
              inputs: [],
              name: "ProxyDeniedAdminAccess",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "previousAdmin",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newAdmin",
                  type: "address",
                },
              ],
              name: "AdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "implementation",
                  type: "address",
                },
              ],
              name: "Upgraded",
              type: "event",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
          ],
        },
        Liquisafe: {
          address: "0x32cd5ecdA7f2B8633C00A0434DE28Db111E60636",
          abi: [
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
              name: "IncorrectPositionId",
              type: "error",
            },
            {
              inputs: [],
              name: "IncorrectReceiver",
              type: "error",
            },
            {
              inputs: [],
              name: "IncorrectToken",
              type: "error",
            },
            {
              inputs: [],
              name: "InsufficientLiquidity",
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
              name: "NotImplemented",
              type: "error",
            },
            {
              inputs: [],
              name: "NotInitializing",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "OrderNotActive",
              type: "error",
            },
            {
              inputs: [],
              name: "PoolNotFound",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint128",
                  name: "",
                  type: "uint128",
                },
              ],
              name: "PositionInsufficientLiquidity",
              type: "error",
            },
            {
              inputs: [],
              name: "PositionManagerNotFound",
              type: "error",
            },
            {
              inputs: [],
              name: "UnauthorizedFactory",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "orderIndex",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "enum Liquisafe.OrderStatus",
                      name: "orderStatus",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderType",
                      name: "orderType",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderRole",
                      name: "orderRole",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "pool",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "positionManager",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token0",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token1",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "positionId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint128",
                      name: "amountLiquidity",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken0Usd",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken1Usd",
                      type: "uint128",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Liquisafe.Order",
                  name: "order",
                  type: "tuple",
                },
              ],
              name: "Add",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "orderIndex",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "enum Liquisafe.OrderStatus",
                      name: "orderStatus",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderType",
                      name: "orderType",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderRole",
                      name: "orderRole",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "pool",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "positionManager",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token0",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token1",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "positionId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint128",
                      name: "amountLiquidity",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken0Usd",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken1Usd",
                      type: "uint128",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Liquisafe.Order",
                  name: "order",
                  type: "tuple",
                },
              ],
              name: "Executed",
              type: "event",
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
              inputs: [],
              name: "WETH",
              outputs: [
                {
                  internalType: "contract IWETH",
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
                  internalType: "enum Liquisafe.OrderRole",
                  name: "orderRole",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "factory",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  internalType: "uint128",
                  name: "amountLiquidity",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken0Usd",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken1Usd",
                  type: "uint128",
                },
              ],
              name: "addOrderV2",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "enum Liquisafe.OrderRole",
                  name: "orderRole",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "factory",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint128",
                  name: "amountLiquidity",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken0Usd",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken1Usd",
                  type: "uint128",
                },
              ],
              name: "addOrderV3",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "allOrders",
              outputs: [
                {
                  internalType: "enum Liquisafe.OrderStatus",
                  name: "orderStatus",
                  type: "uint8",
                },
                {
                  internalType: "enum Liquisafe.OrderType",
                  name: "orderType",
                  type: "uint8",
                },
                {
                  internalType: "enum Liquisafe.OrderRole",
                  name: "orderRole",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "pool",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "positionManager",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token0",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "token1",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "positionId",
                  type: "uint256",
                },
                {
                  internalType: "uint128",
                  name: "amountLiquidity",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken0Usd",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "minAmountToken1Usd",
                  type: "uint128",
                },
              ],
              stateMutability: "view",
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
              name: "authorizedFactories",
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
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "canExecuteOrder",
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
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "cancelOrder",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "countOrders",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimalsUsd",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "orderIndexes",
                  type: "uint256[]",
                },
              ],
              name: "executeOrders",
              outputs: [
                {
                  internalType: "bool[]",
                  name: "executed",
                  type: "bool[]",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "cursor",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "howMany",
                  type: "uint256",
                },
              ],
              name: "fetchPageOrders",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum Liquisafe.OrderStatus",
                      name: "orderStatus",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderType",
                      name: "orderType",
                      type: "uint8",
                    },
                    {
                      internalType: "enum Liquisafe.OrderRole",
                      name: "orderRole",
                      type: "uint8",
                    },
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "pool",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "positionManager",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token0",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "token1",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "positionId",
                      type: "uint256",
                    },
                    {
                      internalType: "uint128",
                      name: "amountLiquidity",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken0Usd",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "minAmountToken1Usd",
                      type: "uint128",
                    },
                  ],
                  internalType: "struct Liquisafe.Order[]",
                  name: "values",
                  type: "tuple[]",
                },
                {
                  internalType: "uint256",
                  name: "newCursor",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "orderIndexes",
                  type: "uint256[]",
                },
              ],
              name: "getExecutableOrders",
              outputs: [
                {
                  internalType: "bool[]",
                  name: "executed",
                  type: "bool[]",
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
              inputs: [
                {
                  internalType: "address",
                  name: "_priceOracle",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_WETH",
                  type: "address",
                },
              ],
              name: "initialize",
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
              name: "nonFungiblePositionManagers",
              outputs: [
                {
                  internalType: "address",
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
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "onERC721Received",
              outputs: [
                {
                  internalType: "bytes4",
                  name: "",
                  type: "bytes4",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "priceOracle",
              outputs: [
                {
                  internalType: "contract IPriceOracle",
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
                  name: "factory",
                  type: "address",
                },
              ],
              name: "removeNonfungiblePositionManager",
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
                  internalType: "address",
                  name: "factory",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "authorized",
                  type: "bool",
                },
              ],
              name: "setFactory",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "factory",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "nonfungiblePositionManager",
                  type: "address",
                },
              ],
              name: "setNonfungiblePositionManager",
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
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_priceOracle",
                  type: "address",
                },
              ],
              name: "updatePriceOracle",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
