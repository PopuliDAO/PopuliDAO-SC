import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

// Define constants for constructor arguments
const MY_TOKEN_INITIAL_SUPPLY = ethers.parseUnits("1000000", 18); // 1 million tokens with 18 decimals
const WORLD_VERIFY_EXTERNAL_NULLVERIFIER = 1234567;
let VERIFYING_COMMAND;
let NETWOWRK_NAME;

let ADDRESS_OP_SEPO_WORLD_ID_ROUTER =
  process.env.ADDRESS_OP_SEPO_WORLD_ID_ROUTER;
let WORLDID_APP_ID = process.env.WORLDID_APP_ID;
let WORLDID_ACTION_ID = process.env.WORLDID_ACTION_ID;
let DAO_QUORUM = 3;
let VOTING_PERIOD = 691200; // 8 days

async function main() {
  NETWOWRK_NAME = ethers.provider._networkName;
  VERIFYING_COMMAND = "npx hardhat verify --network " + NETWOWRK_NAME;

  console.log(
    "ADDRESS_OP_SEPO_WORLD_ID_ROUTER",
    process.env.ADDRESS_OP_SEPO_WORLD_ID_ROUTER
  );
  console.log("WORLDID_APP_ID", process.env.WORLDID_APP_ID);
  console.log("WORLDID_ACTION_ID", process.env.WORLDID_ACTION_ID);

  console.log("Deploying contracts on ", NETWOWRK_NAME);

  // Deploy MyToken contract
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(MY_TOKEN_INITIAL_SUPPLY);
  await myToken.waitForDeployment();
  console.log("MyToken deployed to:", myToken.target);

  // Deploy WorldIdMock contract
  const MyGovernorDao = await ethers.getContractFactory("MyGovernorDao");
  const myGovernorDao = await MyGovernorDao.deploy(DAO_QUORUM, VOTING_PERIOD);
  await myGovernorDao.waitForDeployment();
  console.log("MyGovernorDao deployed to:", myGovernorDao.target);

  // Deploy WorldIdMock contract
  const WorldIdMock = await ethers.getContractFactory("WorldIdMock");
  const worldIdMock = await WorldIdMock.deploy();
  await worldIdMock.waitForDeployment();
  console.log("WorldIdMock deployed to:", worldIdMock.target);

  // Deploy WorldVerify contract
  const WorldVerify = await ethers.getContractFactory("WorldVerify");
  const worldVerify = await WorldVerify.deploy(
    ADDRESS_OP_SEPO_WORLD_ID_ROUTER,
    myGovernorDao.target,
    WORLDID_APP_ID,
    WORLDID_ACTION_ID
  );
  await worldVerify.waitForDeployment();
  console.log("WorldVerify deployed to:", worldVerify.target);

  // Deploy MyGovernorDaoFactory contract
  const MyGovernorDaoFactory = await ethers.getContractFactory(
    "MyGovernorDaoFactory"
  );
  const myGovernorDaoFactory = await MyGovernorDaoFactory.deploy(
    worldVerify.target
  );
  await myGovernorDaoFactory.waitForDeployment();
  console.log("MyGovernorDaoFactory deployed to:", myGovernorDaoFactory.target);

  console.log("\n", "----------------------------------");
  console.log("Verification commands:");
  console.log("\n", "My Token");
  console.log(
    VERIFYING_COMMAND,
    ` ${myToken.target} ${MY_TOKEN_INITIAL_SUPPLY.toString()}`
  );

  console.log("\n", "MyGovernorDao");
  console.log(
    VERIFYING_COMMAND,
    ` ${myGovernorDao.target} ${DAO_QUORUM} ${VOTING_PERIOD}`
  );

  console.log("\n", "WorldIdMock");
  console.log(VERIFYING_COMMAND, ` ${worldIdMock.target}`);

  console.log("\n", "WorldVerify");
  console.log(
    VERIFYING_COMMAND,
    ` ${worldVerify.target} ${ADDRESS_OP_SEPO_WORLD_ID_ROUTER} ${myGovernorDao.target} ${WORLDID_APP_ID} ${WORLDID_ACTION_ID}`
  );

  console.log("\n", "MyGovernorDaoFactory");
  console.log(
    VERIFYING_COMMAND,
    ` ${myGovernorDaoFactory.target} ${worldVerify.target} `
  );

  console.log("----------------------------------", "\n");

  if (ethers.provider._networkName == "optimism_sepolia") {
    console.log("Verifying My Token");
    await hre.run("verify:verify", {
      address: myToken.target,
      constructorArguments: [MY_TOKEN_INITIAL_SUPPLY],
    });

    console.log("Verifying MyGovernorDao");
    await hre.run("verify:verify", {
      address: myGovernorDao.target,
      constructorArguments: [DAO_QUORUM, VOTING_PERIOD],
    });

    console.log("Verifying WorldIdMock");
    await hre.run("verify:verify", { address: worldIdMock.target });

    console.log("Verifying WorldVerify");
    await hre.run("verify:verify", {
      address: myToken.target,
      constructorArguments: [
        worldIdMock.target,
        WORLD_VERIFY_EXTERNAL_NULLVERIFIER,
      ],
    });

    console.log("Verifying WorldVerify");
    await hre.run("verify:verify", {
      address: myGovernorDaoFactory.target,
      constructorArguments: [worldVerify.target],
    });
  } else {
    console.log("Network is not Optimism Sepolia. Skipping verification");
  }

  await myGovernorDao.setWorldVerify(worldVerify.target);

  await myGovernorDao.createProposal(
    "First Proposal",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  );

  await myGovernorDao.createProposal(
    "Second Proposal",
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  );

  await myGovernorDao.createProposal(
    "Third Proposal",
    " It has survived not only five centuries, but also the leap ..."
  );

  let x = await myGovernorDao.listProposals();

  console.log(x);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
