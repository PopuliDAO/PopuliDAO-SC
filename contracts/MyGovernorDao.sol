// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title DAOContract
 * @dev This contract implements a basic DAO (Decentralized Autonomous Organization) where members can create and vote on proposals.
 * The contract includes proposal creation, voting, and proposal execution functionalities.
 */
contract MyGovernorDao {
    /// @notice Proposal structure to store details of each proposal.
    struct Proposal {
        address proposer;  // Address of the member who created the proposal.
        string description;  // Description of the proposal.
        uint256 voteCount;  // Count of votes in favor of the proposal.
        uint256 endTime;  // Timestamp when the voting period ends.
        bool executed;  // Boolean flag to check if the proposal has been executed.
        mapping(address => bool) voters;  // Mapping to track members who have voted.
    }

    /// @notice Mapping of proposal IDs to their corresponding proposals.
    mapping(uint256 => Proposal) public proposals;
    /// @notice Counter for the total number of proposals created.
    uint256 public proposalCount;
    /// @notice Minimum quorum (number of votes) required for a proposal to pass.
    uint256 public quorum;
    /// @notice Duration of the voting period for each proposal in seconds.
    uint256 public votingPeriod;
    /// @notice Address of the contract owner who has special privileges.
    address public owner;
    /// @notice worldid verification contract
    address public worldVerify;

    /// @notice Event emitted when a new proposal is created.
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    /// @notice Event emitted when a proposal is voted on.
    event Voted(uint256 indexed proposalId, address indexed voter);
    /// @notice Event emitted when a proposal is executed.
    event ProposalExecuted(uint256 indexed proposalId);

    /**
     * @dev Modifier to restrict functions to only the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    /**
     * @dev Modifier to restrict functions to only proposals that are still active.
     * @param proposalId The ID of the proposal to check.
     */
    modifier proposalActive(uint256 proposalId) {
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        _;
    }

    /**
     * @dev Modifier to restrict functions to only proposals that have not been executed.
     * @param proposalId The ID of the proposal to check.
     */
    modifier proposalNotExecuted(uint256 proposalId) {
        require(!proposals[proposalId].executed, "Proposal already executed");
        _;
    }

    /**
     * @dev Constructor to initialize the contract with the quorum and voting period.
     * @param _quorum Minimum number of votes required for a proposal to pass.
     * @param _votingPeriod Duration of the voting period for each proposal in seconds.
     */
    constructor(uint256 _quorum, uint256 _votingPeriod) {
        require(_quorum > 0, "Quorum must be greater than 0");
        require(_votingPeriod > 0, "Voting period must be greater than 0");
        quorum = _quorum;
        votingPeriod = _votingPeriod;
        owner = msg.sender;
    }

    /**
     * @dev sets the address of the worldVerify 
     * @param _worldVerify address of the worldVerify contracts
     */
    function setWorldVerify(address _worldVerify) external onlyOwner {
        worldVerify = _worldVerify;
    }

    /**
     * @notice Function to create a new proposal.
     * @param description The description of the proposal.
     */
    function createProposal(string memory description) external {
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.endTime = block.timestamp + votingPeriod;

        emit ProposalCreated(proposalCount, msg.sender, description);
    }

    /**
     * @notice Function to vote on a proposal.
     * @param proposalId The ID of the proposal to vote on.
     */
    function vote(address voter, uint256 proposalId) external proposalActive(proposalId) {
        require(msg.sender == worldVerify);
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voters[voter], "Already voted");

        proposal.voters[voter] = true;
        proposal.voteCount++;

        emit Voted(proposalId, voter);
    }

    /**
     * @notice Function to execute a proposal if it has met the quorum.
     * @param proposalId The ID of the proposal to execute.
     */
    function executeProposal(uint256 proposalId) external proposalNotExecuted(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.endTime, "Voting period not ended");
        require(proposal.voteCount >= quorum, "Proposal did not meet quorum");

        proposal.executed = true;

        // Logic to execute the proposal goes here.
        // This could be a call to an external contract, a transfer of funds, etc.
        // Example: externalContract.someFunction(proposal.proposer);

        emit ProposalExecuted(proposalId);
    }

    /**
     * @notice Function to update the quorum, restricted to the owner.
     * @param _quorum The new quorum value.
     */
    function updateQuorum(uint256 _quorum) external onlyOwner {
        require(_quorum > 0, "Quorum must be greater than 0");
        quorum = _quorum;
    }

    /**
     * @notice Function to update the voting period, restricted to the owner.
     * @param _votingPeriod The new voting period in seconds.
     */
    function updateVotingPeriod(uint256 _votingPeriod) external onlyOwner {
        require(_votingPeriod > 0, "Voting period must be greater than 0");
        votingPeriod = _votingPeriod;
    }
}

