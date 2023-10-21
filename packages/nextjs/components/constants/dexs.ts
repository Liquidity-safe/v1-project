const dexs = [
  {
    contract: "dex",
    platform: "v2",
    name: "uniswap v2",
    addresses: [
      {
        // eth
        chainId: 1,
        factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      },
      {
        chainId: 31337,
        factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      },
    ],
  },
  {
    contract: "dex",
    platform: "v3",
    name: "uniswap v3",
    addresses: [
      {
        // eth
        chainId: 1,
        factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
        position: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      },
      {
        chainId: 31337,
        factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
        position: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      },
    ],
  },
] as any[];

export default dexs;
