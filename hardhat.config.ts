import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-solhint";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-watcher";
import "hardhat-abi-exporter";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // allowUnlimitedContractSize: true,
      forking: {
        url: `https://opt-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKey}`,
      },
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKey}`,
      accounts: { mnemonic: process.env.mnemonic },
    },
    opsepolia: {
      url: `https://opt-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKey}`,
      accounts: { mnemonic: process.env.mnemonic },
    },
    optimism_sepolia: {
      url: `https://opt-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKey}`,
      gasPrice: 500,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
  },
  watcher: {
    compilation: {
      tasks: ["compile"],
    },
    // test: {
    //   tasks: [{ command: "test", params: { testFiles: ["{path}"], bail: true } }],
    //   files: ["./test/**/*"],
    //   verbose: true,
    // },
    buildtest: {
      tasks: [
        "compile",
        { command: "test", params: { parallel: false, bail: false } },
      ],
      files: ["./test/**/*", "./contracts/**/*"],
      verbose: true,
      clearOnStart: true,
      // start: string; // Run any desirable command each time before the task runs
      runOnLaunch: true,
    },
  },
  abiExporter: {
    path: "abis",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [
      "MyGovernorDao",
      "MyGovernorDaoFactory",
      "MyToken",
      "TimeLockMock",
      "WorldIdMock",
      "WorldVerify",
    ],
    spacing: 2,
    pretty: false,
    // format: "minimal"
  },

  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
    customChains: [
      {
        network: "optimism_sepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io/",
        },
      },
    ],
  },
  verify: {
    etherscan: {
      apiKey: `${process.env.ETHERSCAN_API_KEY}`,
    },
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
