// 1. Import packages
const fs = require('fs');
const path = require('path');
const solc = require('solc');

// 2. Get path and load contract
const contractPath = path.resolve(__dirname, "Incrementer.sol");
const source = fs.readFileSync(contractPath, "utf8");

// 3. Create input object
const input = {
   language: 'Solidity',
   sources: {
      'Incrementer.sol': {
         content: source,
      },
   },
   settings: {
      outputSelection: {
         '*': {
            '*': ['*'],
         },
      },
   },
};
// 4. Compile the contract
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(tempFile);
const contractFile = tempFile.contracts['Incrementer.sol']['Incrementer'];
// exports the abi 
fs.writeFileSync('contract_abi.json', JSON.stringify(contractFile.abi));

// 5. Export contract data
module.exports = contractFile;