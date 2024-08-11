//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import { IWorldID } from "./Interfaces/IWorldID.sol";
import {IMyGovernorDao} from "./Interfaces/IMyGovernorDao.sol";

contract WorldIVerifydMock {

    bool public verificationResult;

    mapping(address => bool) public walletWhitelist;

    error NotWhitelistedAddress();

    IMyGovernorDao public MY_GOVERNOR_DAO;

    constructor(
        address _myGovernorDao
    ) {
        MY_GOVERNOR_DAO = IMyGovernorDao(_myGovernorDao);
    }

    function setVerifyResult(bool flag) external {
        verificationResult = flag;
    }

    /// @notice Reversts if any argument is equal to 7
    function registerAccount(
    address signal,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
    ) external {

        if (!verificationResult) revert NotWhitelistedAddress();

        walletWhitelist[signal] = true;

    }

    function vote(uint256 proposalId) public {

        if (!walletWhitelist[msg.sender]) revert NotWhitelistedAddress();

        MY_GOVERNOR_DAO.vote(msg.sender, proposalId);

    }
}

