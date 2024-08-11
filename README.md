# PouliDAO-SC

## Usage

### Installation

```shell
cp .env.example .env
npm install
npx hardhat compile
npx hardhat test
```

## Developer Protal

https://developer.worldcoin.org/login

### Deployments

| Network          | Address                                    | Abi                                                 |
| ---------------- | ------------------------------------------ | --------------------------------------------------- |
| optimism_sepolia | 0xd86A7b271D22B39bDA76158d7794Ef49Fd8BA695 | <a href="./abis/MyToken.json">MyToken</a>           |
| optimism_sepolia | 0x5DC4409DB14F1Ae75341B4D89Ff0205f1a0d5D16 | <a href="./abis/MyGovernorDao.json">WorldIdMock</a> |
| optimism_sepolia | 0xE02f4f7c020Ab6FD7464577e87A095bAFa6d2a42 | <a href="./abis/WorldIdMock.json">WorldIdMock</a>   |
| optimism_sepolia | 0xC7656378b3bF5CAdEedB38538E17f2FFBa02F213 | <a href="./abis/WorldVerify.json">WorldVerify</a>   |

#### Commands

Mock deployment:
`npx hardhat run scripts/MockDeployments.ts [--network <your_network>]`

Integrated deployment:
`npx hardhat run scripts/deployments.js --network <your-network>`

## Integrations

Source: https://docs.worldcoin.org/reference/address-book

### Optimism Mainnet

```
World ID Router:   optimism.id.worldcoin.eth
Bridged World ID:  0xB3E7771a6e2d7DD8C0666042B7a07C39b938eb7d
```

### Optimism Sepolia Testnet

```
World ID Router:   0x11cA3127182f7583EfC416a8771BD4d11Fae4334
Bridged World ID:  0xf07d3efadD82A1F0b4C5Cc3476806d9a170147B
```

### Ethereum Mainnet

```
World ID Router:   id.worldcoin.eth
Identity Manager:  0xf7134CE138832c1456F2a91D64621eE90c2bddEa
```

### Ethereum Sepolia Testnet

```
World ID Router:   0x469449f251692e0779667583026b5a1e99512157
Identity Manager:  0xb2ead588f14e69266d1b87936b75325181377076
```

## Deployments

### Latest Optimism Sepolia deployments
