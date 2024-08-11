// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./MyGovernorDao.sol";

/**
 * @title MyGovernorDaoFactory
 * @dev This factory contract allows deploying instances of the MyGovernorDao contract.
 */
contract MyGovernorDaoFactory {
    /// @notice Event emitted when a new MyGovernorDao instance is created.
    event MyGovernorDaoCreated(address indexed daoAddress, address indexed creator);

    /// @notice Stores addresses of all DAOs created by this factory.
    address[] public allDAOs;
    address public worldIdVerify;

    constructor(address _worldIdVerify) {
        worldIdVerify = _worldIdVerify;
    }

    /**
     * @notice Creates a new instance of MyGovernorDao.
     * @param _quorum Minimum number of votes required for a proposal to pass.
     * @param _votingPeriod Duration of the voting period for each proposal in seconds.
     * @return daoAddress Address of the newly created MyGovernorDao contract.
     */
    function createMyGovernorDao(uint256 _quorum, uint256 _votingPeriod) external returns (address daoAddress) {
        // Create a new MyGovernorDao contract
        MyGovernorDao dao = new MyGovernorDao(_quorum, _votingPeriod);

        // Transfer ownership of the new DAO to the creator
        dao.transferOwnership(msg.sender);
        dao.setWorldVerify(worldIdVerify);

        // Store the address of the new DAO in the array
        allDAOs.push(address(dao));

        // Emit event for new DAO creation
        emit MyGovernorDaoCreated(address(dao), msg.sender);

        // Return the address of the new DAO
        return address(dao);
    }

    /**
     * @notice Returns the total number of DAOs created by this factory.
     * @return The total number of DAOs created.
     */
    function getDAOCount() external view returns (uint256) {
        return allDAOs.length;
    }

    /**
     * @notice Returns the address of the DAO at a specific index.
     * @param index The index of the DAO in the `allDAOs` array.
     * @return The address of the DAO contract.
     */
    function getDAOAtIndex(uint256 index) external view returns (address) {
        require(index < allDAOs.length, "Index out of bounds");
        return allDAOs[index];
    }
}
