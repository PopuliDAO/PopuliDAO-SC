const { ethers } = require("hardhat");
const { expect } = require("chai");

let worldMock;
let worldVerify;

let zeroAddress = ethers.ZeroAddress;
let owner;
let user1;
let user2;
let user3;
let user4;
let externalNullifier = 123456;

let WorldIdAddress;

describe("WorldVerify", async () => {

  beforeEach("Deployment", async () => {
    [owner, user1, user2, user3, user4] = await ethers.getSigners();
    WorldMock = await ethers.getContractFactory("WorldMock");
    worldMock = await WorldMock.deploy();

    WorldIdAddress = worldMock.target;

    WorldVerify = await ethers.getContractFactory("WorldVerify");
    worldVerify = await WorldVerify.deploy(WorldIdAddress, 234);
  });

  describe("Register Account", async () => {

    it("successfully calls registerAccount ", async function () {
      await worldVerify.registerAccount(
        WorldIdAddress,
        6,
        6,
        [6, 6, 5, 4, 3, 2, 1, 0]
      );

    });

    it("not allow repeated address", async function () {

      await worldVerify.registerAccount(
        WorldIdAddress,
        6,
        6,
        [8, 6, 5, 4, 3, 2, 1, 0]
      );

      await expect(
        worldVerify.registerAccount(
          WorldIdAddress,
          6,
          9999,
          [8, 6, 5, 4, 3, 2, 1, 0]
        )
      ).to.be.revertedWith("WorldID already registered");

    });

    it("not allow repeated nullifier", async function () {

      await worldVerify.registerAccount(
        WorldIdAddress,
        6,
        6,
        [8, 6, 5, 4, 3, 2, 1, 0]
      );

      await expect(
        worldVerify.registerAccount(
          WorldIdAddress,
          6,
          6,
          [8, 6, 5, 4, 3, 2, 1, 0]
        )
      ).to.be.revertedWithCustomError(worldVerify, "InvalidNullifier");

    });

  });
});
