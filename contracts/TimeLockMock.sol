//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLockMock is TimelockController {

    constructor(
        uint256 minDelay, address[] memory proposers, address[] memory executors, address admin
    )
        TimelockController(minDelay, proposers, executors, admin)
    {
    }

}

