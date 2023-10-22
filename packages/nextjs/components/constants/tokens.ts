import { IToken } from "~~/types/IToken";

const tokens = [
  {
    contract: "erc20",
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
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
      {
        chainId: 5,
        address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
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
      {
        chainId: 5,
        address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
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
      {
        chainId: 5,
        address: "0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05",
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
      {
        chainId: 5,
        address: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      },
    ],
  },
] as IToken[];

export default tokens;
