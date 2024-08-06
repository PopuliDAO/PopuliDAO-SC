//SPDX-License-Identifier

import { IWorldID } from "./Interfaces/IWorldID.sol";

pragma solidity ^0.8.20;


contract WorldVerify {

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    struct DAOParticipant {
        address WalletAddress;
    }

    mapping(address => uint256) AddressToWorldID;
    mapping(uint256 => address) WorldIDToAddress;
    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;  

    event DAOParticipantRegistered(address indexed WalletAddress);

    ////////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                ///
    //////////////////////////////////////////////////////////////////////////////

    error WorldIDAlreadyUsed();

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function registeraccount(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
        require(WorldIDToAddress[signal] == address(0), "WorldID already registered to an existing address");

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        WorldIDToAddress[signal] != 0;

        emit DAOParticipant(signal);

        // Finally, execute your logic here, for example issue a token, NFT, etc...
        // Make sure to emit some kind of event afterwards!
    }

}
