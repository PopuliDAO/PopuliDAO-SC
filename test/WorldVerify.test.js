const { ethers } = require("hardhat");
const { expect } = require("chai");

let worldIdMock;
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
    WorldIdMock = await ethers.getContractFactory("WorldIdMock");
    worldIdMock = await WorldIdMock.deploy();

    WorldIdAddress = worldIdMock.target;

    WorldVerify = await ethers.getContractFactory("WorldVerify");
    worldVerify = await WorldVerify.deploy(
      WorldIdAddress,
      "WORLDID_APP_ID",
      "WORLDID_ACTION_ID"
    );
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
      ).to.be.revertedWithCustomError(WorldVerify, "WorldIDAlreadyUsed");
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

    it("revert when the root doesn't exists", async function () {
      await expect(
        worldVerify.registerAccount(
          WorldIdAddress,
          7,
          6,
          [8, 6, 5, 4, 3, 2, 1, 0]
        )
      ).to.be.revertedWithCustomError(WorldIdMock, "NonExistentRoot");
    });

    it("revert when root is expired", async function () {
      await expect(
        worldVerify.registerAccount(
          WorldIdAddress,
          77,
          6,
          [8, 6, 5, 4, 3, 2, 1, 0]
        )
      ).to.be.revertedWithCustomError(WorldIdMock, "ExpiredRoot");
    });
  });
});
