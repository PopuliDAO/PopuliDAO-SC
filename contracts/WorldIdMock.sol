//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import { IWorldID } from "./Interfaces/IWorldID.sol";

contract WorldMock is IWorldID {

    /// @notice Reversts if any argument is equal to 7
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external pure {
        require( root != 7, "wrong root");
        require( groupId != 7, "Wrong groupId");
        require( signalHash != 7, "Wrong signalHash");
        require( nullifierHash != 7, "Wrong nullifierHash");
        require( externalNullifierHash != 7, "Wrong externalNullifierHash");
        require( proof[0] != 7, "Wrong proof");
    }

}

