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

| Network          | Address                                    | Abi                                                                 |
| ---------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| optimism_sepolia | 0x1bE9984ae32d94b6eBcD2E36A412554581c98f50 | <a href="./abis/MyToken.json">MyToken</a>                           |
| optimism_sepolia | 0xf6b651E885C3E68dB3417f14bdbe44a6919CC08C | <a href="./abis/MyGovernorDao.json">MyGovernorDao</a>               |
| optimism_sepolia | 0x276cAe027a159A987c8947b7330dAcd05a20a61d | <a href="./abis/WorldIdMock.json">WorldIdMock</a>                   |
| optimism_sepolia | 0x352A90fA8A50Fd06e1Ea2483Ae975d05A5864a62 | <a href="./abis/WorldVerify.json">WorldVerify</a>                   |
| optimism_sepolia | 0x273fB65684678a7a71bFbc2F168ee871a87ACD2A | <a href="./abis/MyGovernorDaoFactory.json">MyGovernorDaoFactory</a> |

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
