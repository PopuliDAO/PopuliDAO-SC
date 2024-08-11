const { ethers } = require("hardhat");
const { expect } = require("chai");

let worldIdMock;
let worldVerify;

let zeroAddress = ethers.ZeroAddress;

let owner;
let proposers;
let proposers1;
let proposers2;
let proposers3;

let executors;
let executors1;
let executors2;
let executors3;
let minDelay;

let externalNullifier = 123456;

const MY_TOKEN_INITIAL_SUPPLY = ethers.parseUnits("1000000", 18); // 1 million tokens with 18 decimals
let WorldIdAddress;

describe.skip("MyGovernor", async () => {
  beforeEach("Deployment", async () => {
    [
      owner,
      proposers1,
      proposers2,
      proposers3,
      executors1,
      executors2,
      executors3,
    ] = await ethers.getSigners();

    proposers = [proposers1, proposers2, proposers3];
    executors = [executors1, executors2, executors3];

    minDelay = 15;

    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(MY_TOKEN_INITIAL_SUPPLY);

    TimeLockMock = await ethers.getContractFactory("TimeLockMock");
    timeLockMock = await TimeLockMock.deploy(
      minDelay,
      proposers,
      executors,
      owner.address
    );

    MyGovernor = await ethers.getContractFactory("MyGovernor");
    myGovernor = await MyGovernor.deploy(myToken.target, timeLockMock.target);
  });

  describe("Register Account", async () => {
    it("pass", async function () {
      expect(true).to.be.equal(true);
    });
  });
});
