const { ethers } = require("hardhat");
const { expect } = require("chai");
// import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

let QUORUM = 2;
let PERIOD = 3600;

let worldIdMock;
let worldVerify;
let myGovernorDao;

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

describe("MyGovernor", async () => {
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

    // TimeLockMock = await ethers.getContractFactory("TimeLockMock");
    // timeLockMock = await TimeLockMock.deploy(
    //   minDelay,
    //   proposers,
    //   executors,
    //   owner.address
    // );

    MyGovernorDao = await ethers.getContractFactory("MyGovernorDao");
    myGovernorDao = await MyGovernorDao.deploy(QUORUM, PERIOD);

    WorldIVerifydMock = await ethers.getContractFactory("WorldIVerifydMock");
    worldVerify = await WorldIVerifydMock.deploy(myGovernorDao.target);

    await myGovernorDao.setWorldVerify(worldVerify.target);
  });

  describe("Create Proposal", async () => {
    it("pass", async function () {
      let startCount = Number(await myGovernorDao.proposalCount());
      await myGovernorDao.createProposal("name 1", "Lorem ipsum");
      let endCount = Number(await myGovernorDao.proposalCount());

      expect(startCount + 1).to.be.equal(endCount);
    });

    it("List Proposals", async function () {
      await myGovernorDao
        .connect(proposers1)
        .createProposal("name 1", "Lorem ipsum");
      await myGovernorDao
        .connect(proposers2)
        .createProposal("name 2", "Lorem ipsum");
      await myGovernorDao
        .connect(proposers3)
        .createProposal("name 3", "Lorem ipsum");

      let endCount = Number(await myGovernorDao.proposalCount());

      let proposals = await myGovernorDao.listProposals();

      expect(endCount).to.be.equal(3);

      expect(proposals[0][0]).to.be.equal(proposers1);
      expect(proposals[0][1]).to.be.equal(proposers2);
      expect(proposals[0][2]).to.be.equal(proposers3);
    });
  });

  describe.only("Voting on proposals", async () => {
    let proposal1;
    let proposals;

    beforeEach("Jumpstart proposals", async () => {
      await myGovernorDao
        .connect(proposers1)
        .createProposal("name 1", "Lorem ipsum");
      await myGovernorDao
        .connect(proposers2)
        .createProposal("name 1", "Lorem ipsum");
      proposal1 = await myGovernorDao.proposals(1);
      proposals = await myGovernorDao.listProposals();

      await worldVerify.setVerifyResult(true);
      await worldVerify.registerAccount(
        proposers1.address,
        6,
        6,
        [8, 6, 5, 4, 3, 2, 1, 0]
      );

      // ).to.be.revertedWithCustomError(WorldIVerifydMock, "NotWhitelistedAddress");
    });

    it("vote", async function () {
      await worldVerify.connect(proposers1).vote(1);

      proposal1End = await myGovernorDao.proposals(1);

      await expect(Number(proposal1[3]) + 1).to.be.equal(proposal1End[3]);
    });

    it("revert when voting directly", async function () {
      await expect(
        myGovernorDao.connect(proposers2).vote(proposers2.address, 1)
      ).to.be.revertedWith("Not WorldIdVerify");
    });

    it("revert when voting twice", async function () {
      await worldVerify.connect(proposers1).vote(1);

      await expect(worldVerify.connect(proposers1).vote(1)).to.be.revertedWith(
        "Already Voted"
      );
    });

    // TODO: continue testing

    it.skip("reach vote quorum", async function () {
      await worldVerify.registerAccount(
        proposers2.address,
        6,
        6,
        [8, 6, 5, 4, 3, 2, 1, 0]
      );

      await worldVerify.connect(proposers1).vote(1);
      await worldVerify.connect(proposers2).vote(1);

      await myGovernorDao.updateVotingPeriod(1);
      await myGovernorDao.executeProposal(1);
    });

    // execute qith quorum
    // execute quorum

    // reverft execute without quorum
    // reverft before time
    // it("reach vote quorum", async function () {
    //
    //   await worldVerify.registerAccount(proposers2.address, 6, 6, [8, 6, 5, 4, 3, 2, 1, 0]);
    //
    //   await worldVerify.connect(proposers1).vote(1)
    //
    //   await expect( myGovernorDao.executeProposal(1) ).to.revertedWith("x");
    //
    //   await worldVerify.connect(proposers2).vote(1)
    //
    //    myGovernorDao.executeProposal(1)
    //
    //
    //   let propsalEnd = await myGovernorDao.proposals(1);
    //   console.log(propsalEnd);
    //
    // });
  });
});
