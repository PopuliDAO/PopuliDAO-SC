//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ByteHasher} from "./libraries/ByteHasher.sol";
import {IWorldID} from "./Interfaces/IWorldID.sol";




contract WorldVerify {
    struct DAOParticipant {
        address walletaddress;
    }

    using ByteHasher for bytes;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifierHash;

    /// @dev The World ID group ID (always 1) which represents ORB Identified users only
    uint256 internal immutable groupId = 1;

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    // This can be a mapping solution for WorldID wallet address verification
    // mapping(address => uint256) AddressToWorldID;
    // mapping(uint256 => address) WorldIDToAddress;

    // My second solution create a WalletWhitelist with a boolean value that he has already minted tokens or not
    mapping(address => bool) WalletWhitelist;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    event DAOParticipantRegistered(address indexed walletaddress);

    ////////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                ///
    //////////////////////////////////////////////////////////////////////////////

    error WorldIDAlreadyUsed();

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @param _worldId The address of the WorldIDRouter that will verify the proofs
    /// @param _appId The World ID App ID (from Developer Portal)
    /// @param _action The World ID Action (from Developer Portal)
    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _action
    ) {
        worldId = IWorldID(_worldId);
        // externalNullifierHash = _externalNullifier;
        externalNullifierHash = abi.encodePacked(
            abi.encodePacked(_appId).hashToField(), _action
        ).hashToField();


    }

    /// @dev Registers a new account
    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    function registerAccount(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        require(WalletWhitelist[signal] == false, "WorldID already registered");

        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifierHash,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        // Finally, execute your logic here, for example issue a token, NFT, etc...
        // Make sure to emit some kind of event afterwards!
        WalletWhitelist[signal] = true;

        emit DAOParticipantRegistered(signal);
        // Optional: emit DAOParticipantRegistered(signal);
    }

    // Function to create Voting proposal
    function createProposal(address walletaddress) public {
        require(WalletWhitelist[walletaddress], "Wallet is not whitelisted");
        // Create a proposal
    }
}
