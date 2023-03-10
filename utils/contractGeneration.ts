import fs from 'fs';
const Handlebars = require('handlebars');

interface paramInterface {
    projectName: string;
    projectAbbreviation: string;
    maxSupply: number;
    mintPrice: number;
    maxPerWallet: number;
    ipfsAddress: string;
    contractName: string;
}

const contract = { 
    generate: async function(configParams: paramInterface, ethAddress: string){
        //! go through the entire generation process and ensure that the handlebars are in correct locations
        //! a lot is still missing from the contract even though it is passed into the config

        // todo
        // go through the reveal type options and build these into the generation

        // todo
        // need to go through and add the additional features for the contract
        // review the params which are being passed in and make sure these change the contract in some way
        
        // handlebars is used 
        
        // this is where the contract is generated

        // todo 
        // come up with a way to generate a unique id for the contract
        // this id can then be passed and returned to the user
        // using this id the contract can then be accessed.

        // source of the contract
        // todo this needs to be moved back or the outputted code is two tabs in

        // crreate randomisation for the 

        // gets contract name
        configParams.contractName = '';
        configParams.contractName = configParams.projectName.replaceAll(' ', '');

        const source = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
contract {{contractName}} is ERC721, ERC721URIStorage, Ownable {
    uint256 public totalSupply; 
    bool public mintEnabled;
    {{#unless instantReveal}}
    bool public revealed;
    {{/unless}}
    uint256 public maxSupply = {{maxSupply}};
    uint256[] public tokenIDs;
    mapping(address => uint256) public mintedWallets;
    {{#unless instantReveal}} 
    string public unrevealedBaseURI;
    {{/unless}}
    string public baseURI;
    constructor(
      string memory _initBaseURI{{#unless instantReveal}},{{/unless}}
      {{#unless instantReveal}}
      string memory _initUnrevealedURI
      {{/unless}}
    ) ERC721("{{projectName}}", "{{projectAbbreviation}}") {
        {{#unless instantReveal}}
        unrevealedBaseURI = _initUnrevealedURI;
        {{/unless}}
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
        {{#unless instantReveal}}
        if(!revealed){
          return unrevealedBaseURI;
        }
        {{/unless}}
        require(tokenIDs[tokenId] != 1, "NFT has not yet been minted");
    
        return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json"));
    }
    function publicMint(
        address recipient,
        uint256 amount
    ) public payable {
        require(mintEnabled, "Minting is not yet enabled");
        require(mintedWallets[msg.sender] + amount <= {{maxPerWallet}}, "You cannot mint more than {{maxPerWallet}}!");
        require(totalSupply + amount <= maxSupply, "Max NFTS have been reached");
        require(msg.value == {{mintPrice}}, "This NFT costs {{mintPrice}} ETH");
        
        {{#unless singleWalletMint}}
        for (uint i = 0; i < amount; i++){
            totalSupply ++;
        
            mintedWallets[msg.sender]++;
        
            tokenIDs.push(totalSupply);
        
            _safeMint(recipient, totalSupply);
        }
        {{/unless}}
        {{#if singleWalletMint}}
        totalSupply++;
        mintedWallets[msg.sender]++;
        tokenIDs.push(totalSupply);
        _safeMint(recipient, totalSupply);
        {{/if}}
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
    {{#unless instantReveal}}
    function toggleRevealed() public onlyOwner {
      revealed = !revealed;
    }
    {{/unless}}
    {{#unless instantReveal}}
    function getRevealedStatus() public view onlyOwner returns (bool) {
      return revealed;
    }
    {{/unless}}
    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}`;
        const template = Handlebars.compile(source);
        
        // this will be replaced with the config params
        const contents = await template(configParams);

        // todo save the contract under some sort of id
        fs.writeFileSync(`${process.env.PWD}/user_contracts/contract_${ethAddress}.sol`, contents);

        // also needs to return back the id of the saved contract

        return {
            message: "Success!",
            contractID: `contract_${ethAddress}.sol`,
            contractName: configParams.contractName
        }
    }
}

module.exports = contract.generate;