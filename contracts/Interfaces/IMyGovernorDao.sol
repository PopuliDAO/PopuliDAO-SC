//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IMyGovernorDao {

    /**
     * @notice Function to vote on a proposal.
     * @param proposalId The ID of the proposal to vote on.
     */
    function vote(address voter, uint256 proposalId) external ;
}
