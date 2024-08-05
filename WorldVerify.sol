//SPDX-License-Identifier

import { IWorldID } from "./interfaces/IWorldID.sol";

pragma solidity ^0.8.20;


contract WorldVerify {

    mapping(address => uint256) AddressToWorldID;
    mapping(uint256 => address) WorldIDToAddress;
    

    ////////////////////////////////////////////////////////////////////////////////
	///                                  ERRORS                                ///
	//////////////////////////////////////////////////////////////////////////////

    error WorldIDAlreadyUsed();

    /// @dev The World ID instance that will be used for verifying proofs
	IWorldID internal immutable worldId;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
	mapping(uint256 => bool) internal nullifierHashes;  
    


}