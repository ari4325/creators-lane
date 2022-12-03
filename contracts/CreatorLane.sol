// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CreatorNFT.sol";

contract Creator is ERC2771Recipient{

    using Counters for Counters.Counter;
    using SafeMath for uint;

    Counters.Counter private _tokenIdCounter;
    CreatorNFT creator;
    address owner;

    enum UserType{
        BELIEVER,
        CREATOR
    }

    struct Share {
        uint _tokenId;
        uint _totalAmount;
        uint _price;
        uint _fundsRaised;
        uint _bought;
        string name;
        string genre; 
    }

    struct Payout {
        uint tokenId;
        bool released; 
        uint totalAmount;
        uint amountPerBeliever;
    }

    mapping(uint => uint) prices;

    mapping(address => bool) isCreator;

    mapping(address => UserType) userTypes;
    mapping(address => Share) creatorShares;
    mapping(uint => address) tokenToCreator;
    mapping(address => bool) sharesPublished;
    mapping(address => uint) creatorToToken;
    
    mapping(uint => Payout) payoutPerToken;
    mapping(address => mapping(uint => bool)) payoutClaimed;
    mapping(address => mapping(uint => uint)) userToTokenAmount;
    mapping(address => mapping(uint => bool)) userToToken;
    mapping(uint => address[]) tokenOwners;
    mapping(address => uint[]) userTokens;
    address[] creators;

    event SharesPublished(address indexed _creator, uint indexed _token, uint indexed _numberOfTokens);
    event PayoutReleased(address indexed _creator, uint indexed _token, uint indexed _payoutValue);

    modifier onlyCreator(address _sender) {
        require(isCreator[_sender], "Only creator can publish token shares");
        _;
    }

    constructor(address _creatorNFT, address _forwarder) {
        creator = CreatorNFT(_creatorNFT);
        _setTrustedForwarder(_forwarder);
        owner = msg.sender;
    }

    function setTrustedForwarder(address _forwarder) external {
        require(msg.sender == owner, "Only owner can make changes");
        _setTrustedForwarder(_forwarder);
    }

    function publishShares(string memory _name, string memory _genre, uint amount, uint price) external {
        require(isTrustedForwarder(msg.sender), "Only calls from trusted forwarder accepted");
        require(!sharesPublished[msg.sender], "Shares have already been minted");

        address _sender = _msgSender();
        isCreator[_sender] = true;

        _tokenIdCounter.increment();
        uint id = _tokenIdCounter.current();

        tokenToCreator[id] = _sender;
        creatorToToken[_sender] = id;
        creator.mint(_sender, id, amount, "");
        creator.approveOperatorForCreator(_sender, address(this), true);
        sharesPublished[_sender] = true;

        Share storage share = creatorShares[_sender];
        share._tokenId = id;
        share._totalAmount = amount;
        share._price = price;
        share._bought = 0;
        share._fundsRaised = 0;
        share.name = _name;
        share.genre = _genre;

        prices[id] = price;
        creators.push(_sender);

        emit SharesPublished(_sender, id, amount);
    }

    function invest(uint id, uint amount) external {
        require(isTrustedForwarder(msg.sender), "Only calls from trusted forwarder accepted");
        address _creator = tokenToCreator[id];

        address _sender = _msgSender();

        Share storage share = creatorShares[_creator];
        uint bought = share._bought;
        uint available = share._totalAmount - bought;

        require(amount <= available, "Requested amount is not available");

        share._bought += amount;
        share._fundsRaised += share._price * amount;

        userToTokenAmount[_sender][id] += amount;
        userTokens[_sender].push(id);
        tokenOwners[id].push(_sender);

        (bool success, ) = _creator.call{value: share._price * amount}("");
        require(success, "There was some error while trying to invest"); 
        creator.safeTransferFrom(_creator, _sender, id, amount, "");
    }

    function releasePayouts() external payable onlyCreator(msg.sender){
        uint id = creatorToToken[msg.sender];

        Share storage share = creatorShares[msg.sender];

        Payout storage payout = payoutPerToken[id];
        payout.tokenId = id;
        payout.released = true;
        payout.totalAmount = msg.value;
        payout.amountPerBeliever = SafeMath.div(msg.value, share._totalAmount);

        emit PayoutReleased(msg.sender, id, msg.value);
    } 

    function getPayoutDetails(address _creator) external view returns(Payout memory) {
        return payoutPerToken[creatorToToken[_creator]];
    }

    function getPayoutDetails(uint id) external view returns(Payout memory){
        return payoutPerToken[id];
    }

    function getUserTokens() external view returns(uint[] memory) {
        return userTokens[msg.sender];
    }

    function getAllCreators() external view returns(address[] memory) {
        return creators;
    }

    function getCreatorShare(address _creator) external view returns(Share memory){
        return creatorShares[_creator];
    }

    function claimPayout(uint id) external {
        require(isTrustedForwarder(msg.sender), "Only calls from trusted forwarder accepted");
        address _sender = _msgSender();
        require(!payoutClaimed[_sender][id], "User has claimed the payout");

        Payout storage payout = payoutPerToken[id];
        uint amountPayable = SafeMath.mul(payout.amountPerBeliever, userToTokenAmount[_sender][id]);

        payoutClaimed[_sender][id] = true;
        (bool success, ) = _sender.call{value: amountPayable}("");
        require(success, "There was some problem in transferring the funds");
    }

}