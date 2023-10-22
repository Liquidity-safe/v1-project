# 🦺 Liquisafe

🧪 Protect your liquidities against price declines, choose the price at which you want to withdraw your cash and protect yourself against major losses.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

## LiquisafeHook

An Uniswap v4 hook, trigger your uniswap v3 position withdraw directly in uniswap v4 hook

## Address

Mantle Testnet : 

[TWEET](https://twitter.com/infernal_tower/status/1716199704696897843)

Liquisafe [0x13348b852c94976fA78B3A00F6c5834b868F010A](https://explorer.testnet.mantle.xyz/address/0x13348b852c94976fA78B3A00F6c5834b868F010A/contracts#address-tabs)

PriceOracle [0xC261dA384EA1F68b7da219AB19bbdB13F357b4e0](https://explorer.testnet.mantle.xyz/address/0xC261dA384EA1F68b7da219AB19bbdB13F357b4e0/contracts#address-tabs)


Polygon Zkevm testnet :

Liquisafe [0xe167CF94F3fE6cd37A817a37eE8F2FE0ed4057d0](https://testnet-zkevm.polygonscan.com/address/0xe167CF94F3fE6cd37A817a37eE8F2FE0ed4057d0#code)

PriceOracle [0xA921352173fE5bF4cd1CBcfb1AA280932865560f](https://testnet-zkevm.polygonscan.com/address/0xA921352173fE5bF4cd1CBcfb1AA280932865560f#code)

Scroll Sepolia

Liquisafe [0xC0c73537B0a76aEE7E2B557Ed3D56Ab8DbD0FceA](https://sepolia-blockscout.scroll.io/address/0xC0c73537B0a76aEE7E2B557Ed3D56Ab8DbD0FceA/contracts#address-tabs)

PriceOracle [0x9a1bFf80A98480FD2A82603a474cf65B53Bce82a](https://sepolia-blockscout.scroll.io/address/0x9a1bFf80A98480FD2A82603a474cf65B53Bce82a/contracts#address-tabs)


Goerli :

Liquisafe 0xC0c73537B0a76aEE7E2B557Ed3D56Ab8DbD0FceA

PriceOracle 0x9a1bFf80A98480FD2A82603a474cf65B53Bce82a

## The graph
subgraph address :

https://thegraph.com/hosted-service/subgraph/youtpout/liquisafe

## Verify exemple

forge verify-contract 0xe167cf94f3fe6cd37a817a37ee8f2fe0ed4057d0 Liquisafe --watch --chain-id 5

forge verify-contract 0xC0c73537B0a76aEE7E2B557Ed3D56Ab8DbD0FceA TransparentUpgradeableProxy --watch --chain-id 5 --constructor-args $(cast abi-encode "constructor(address,address,bytes)" 0xe167cf94f3fe6cd37a817a37ee8f2fe0ed4057d0 0xE3051507DB7881fA2B3B1Fd6923211f52aFf646b 0x485cc9550000000000000000000000009a1bff80a98480fd2a82603a474cf65b53bce82a000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d6)

forge verify-contract 0xC261dA384EA1F68b7da219AB19bbdB13F357b4e0 PriceOracle --watch --verifier-url https://explorer.testnet.mantle.xyz/api?module=contract&action=verify

forge verify-contract 0xe167cf94f3fe6cd37a817a37ee8f2fe0ed4057d0  PriceOracle --watch --verifier-url https://sepolia-blockscout.scroll.io/api\? --verifier blockscout


forge verify-contract 0x9a1bff80a98480fd2a82603a474cf65b53bce82a Liquisafe --watch --chain-id 1442


## build with scaffold-eth