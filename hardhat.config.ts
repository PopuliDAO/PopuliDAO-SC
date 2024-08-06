import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
      // Add other versions if needed
    ],
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKey}`,
      accounts: { mnemonic: process.env.mnemonic },
    },
    opsepolia: {
      url: `https://opt-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKey}`,
      accounts: { mnemonic: process.env.mnemonic },
    },
  },
};

export default config;
