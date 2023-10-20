const dexs = [
  {
    contract: "factory",
    platform: "v2",
    name: "uniswap v2",
    addresses: [
      {
        // eth
        chainId: 1,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      {
        chainId: 31337,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
    ],
  },
  {
    contract: "erc20",
    name: "USD Coin ",
    symbol: "USDC",
    decimals: 6,
    addresses: [
      {
        // eth
        chainId: 1,
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
      {
        chainId: 31337,
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
    ],
  },
  {
    contract: "erc20",
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    addresses: [
      {
        // eth
        chainId: 1,
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      },
      {
        chainId: 31337,
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      },
    ],
  },
  {
    contract: "erc20",
    name: "ChainLink Token",
    symbol: "LINK",
    decimals: 18,
    addresses: [
      {
        // eth
        chainId: 1,
        address: "0x514910771af9ca656af840dff83e8264ecf986ca",
      },
      {
        chainId: 31337,
        address: "0x514910771af9ca656af840dff83e8264ecf986ca",
      },
    ],
  },
] as any[];

export default dexs;
