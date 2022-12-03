// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CreatorNFT is ERC1155, AccessControl {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant APPROVAL_ROLE = keccak256("APPROVAL_ROLE");

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(APPROVAL_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mintBatch(to, ids, amounts, data);
    }

    function approveOperatorForCreator(address _creator, address _operator, bool approved) 
        external 
        onlyRole(APPROVAL_ROLE) 
    {
        _setApprovalForAll(_creator, _operator, approved);
    }

    function setContract(address _contract) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, _contract);
        _grantRole(APPROVAL_ROLE, _contract);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setApprovalForAll(address operator, bool approved) public virtual override onlyRole(DEFAULT_ADMIN_ROLE) {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    function setApprovalRole(address _operator) external onlyRole(DEFAULT_ADMIN_ROLE){
        _grantRole(APPROVAL_ROLE, _operator);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override onlyRole(APPROVAL_ROLE) {
        require(
            isApprovedForAll(from, msg.sender),
            "ERC1155: caller is not approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }
}