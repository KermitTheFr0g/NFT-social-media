// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
contract GunKillers is ERC721, ERC721URIStorage, Ownable {
    uint256 public totalSupply; 
    bool public mintEnabled;
    bool public revealed;
    uint256 public maxSupply = 1000;
    uint256[] public tokenIDs;
    mapping(address => uint256) public mintedWallets;
    string public unrevealedBaseURI;
    string public baseURI;
    constructor(
      string memory _initBaseURI,
      string memory _initUnrevealedURI
    ) ERC721("GunKillers", "GK") {
        unrevealedBaseURI = _initUnrevealedURI;
        baseURI = _initBaseURI;
    }
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        if(!revealed){
          return unrevealedBaseURI;
        }
        require(tokenIDs[tokenId] != 1, "NFT has not yet been minted");
    
        return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json"));
    }
    function publicMint(
        address recipient,
        uint256 amount
    ) public payable {
        require(mintEnabled, "Minting is not yet enabled");
        require(mintedWallets[msg.sender] + amount <= 5, "You cannot mint more than 5!");
        require(totalSupply + amount <= maxSupply, "Max NFTS have been reached");
        require(msg.value == 0, "This NFT costs 0 ETH");
        
        for (uint i = 0; i < amount; i++){
            totalSupply ++;
        
            mintedWallets[msg.sender]++;
        
            tokenIDs.push(totalSupply);
        
            _safeMint(recipient, totalSupply);
        }
    }
    function isContentOwned(uint256 tokenId) public view returns (bool) {
        return tokenIDs[tokenId] == 1;
    }
    function getCount() public view returns(uint256){
        return totalSupply;
    }
    function toggleMint() public onlyOwner {
        mintEnabled = !mintEnabled;
    }
    function getMintStatus() public view onlyOwner returns (bool) {
      return mintEnabled;
    }
    function toggleRevealed() public onlyOwner {
      revealed = !revealed;
    }
    function getRevealedStatus() public view onlyOwner returns (bool) {
      return revealed;
    }
    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}