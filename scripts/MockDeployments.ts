import { ethers } from "hardhat";

// Define constants for constructor arguments
const MY_TOKEN_INITIAL_SUPPLY = ethers.parseUnits("1000000", 18); // 1 million tokens with 18 decimals
const WORLD_VERIFY_EXTERNAL_NULLVERIFIER=1234567

async function main() {
  console.log("Deploying contracts on ", ethers.provider._networkName);
  // Deploy MyToken contract
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(MY_TOKEN_INITIAL_SUPPLY);
  await myToken.waitForDeployment();
  console.log("MyToken deployed to:", myToken.target);

  // Deploy WorldIdMock contract
  const WorldIdMock = await ethers.getContractFactory("WorldIdMock");
  const worldIdMock = await WorldIdMock.deploy();
  await worldIdMock.waitForDeployment();
  console.log("WorldIdMock deployed to:", worldIdMock.target);

  // Deploy WorldVerify contract
  const WorldVerify = await ethers.getContractFactory("WorldVerify");
  const worldVerify = await WorldVerify.deploy(worldIdMock.target, MY_TOKEN_INITIAL_SUPPLY);
  await worldVerify.waitForDeployment();
  console.log("WorldVerify deployed to:", worldVerify.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

