//SPDX-License-Identifier

import { IWorldID } from "./interfaces/IWorldID.sol";

pragma solidity ^0.8.20;


contract WorldVerify {

    mapping(address => uint256) AddressToWorldID;
    mapping(uint256 => address) WorldIDToAddress;
        
    

}