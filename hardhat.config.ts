import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-solhint";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
    ],
  },
  defaultNetwork: "hardhat",
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
    optimism_sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKey}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
  },
};

export default config;
