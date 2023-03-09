require('dotenv').config({ path: '../../.env' });

// 1. Import the contract file
const contractFile = require('./test');

// 2. Add the Ethers provider logic here:
// 1. Import ethers
const ethers = require('ethers');

// 2. Define network configurations
const url = 'https://rpc2.sepolia.org';
const provider = new ethers.providers.JsonRpcProvider(url)

// 3. Create account variables
const account_from = {
  privateKey: process.env.PRIVATE,
};

// 4. Save the bytecode and ABI
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// 5. Create wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

// 6. Create contract instance with signer
const incrementer = new ethers.ContractFactory(abi, bytecode, wallet);

// 7. Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account: ${wallet.address}`);

  // 8. Send tx (initial value set to 5) and wait for receipt
  //todo enter in params for the 
  const contract = await incrementer.deploy('ipfs://123', 'ipfs://134');
  const txReceipt = await contract.deployTransaction.wait();


  console.log(`Contract deployed at address: ${txReceipt.contractAddress}`);
};

const transfer = async (contractAddress) => {
  const newAddress = '0x516923E55e9eD4Bcf08CFA4A477a11805b0CD72C'
  console.log(`Attempting to transfer contract to: ${newAddress}`);

  const deployedContract = new ethers.Contract('0xb8eC1875b89042939464f8a169f8A9028887D386', abi, wallet);

  console.log(await deployedContract.transferOwnership(newAddress))
}

const mint = async () => {
  console.log(`Attempting to mint from: ${'0xb8eC1875b89042939464f8a169f8A9028887D386'}`);

  const deployedContract = new ethers.Contract('0xb8eC1875b89042939464f8a169f8A9028887D386', abi, wallet);

  console.log(await deployedContract.toggleMint());
  console.log(await deployedContract.publicMint('0x516923E55e9eD4Bcf08CFA4A477a11805b0CD72C', '1'));
}

// 9. Call the deploy function
//deploy();
//transfer();
mint()