const { ethers } = require("hardhat");
const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

let worldMock;
let worldVerify;

let WorldIdAddress;

describe("WorldVerify", async () => {

  // const [owner, addr1] = await hre.ethers.getSigners();

  // signers = await ethers.getSigners();
  // owner = signers[0];
  // other = signers[1]; 

  beforeEach("Deployment", async () => {

    WorldMock  = await ethers.getContractFactory("WorldMock");
    worldMock = await WorldMock.deploy();

    WorldIdAddress = worldMock.target;

    WorldVerify  = await ethers.getContractFactory("WorldVerify");
    worldVerify = await WorldVerify.deploy(WorldIdAddress);

  });



  describe("Register Account", async () => {
    it("successfully calls registerAccount ", async function () {


      await worldVerify.registerAccount(WorldIdAddress, 7, 7, [7, 6, 5, 4, 3, 2, 1, 0]);

      expect(true).to.equal(false);

      expect(true).to.be.equal(false, "Unexpected period number");

    });

    it.only("fails when an address is already registered", async function () {

      console.log("going");
      await worldVerify.registerAccount(WorldIdAddress, 7, 7, [7, 6, 5, 4, 3, 2, 1, 0])
      console.log("still");
      await expect(
        await worldVerify.registerAccount(WorldIdAddress, 7, 0, [7, 6, 5, 4, 3, 2, 1, 0])
      ).to.be.revertedWith("WorldID already registered");


    });
  });

});
