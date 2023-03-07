require('dotenv').config({ path: '../../.env' });

// 1. Import the contract file
const contractFile = require('./compile');

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
  const contract = await incrementer.deploy(5);
  const txReceipt = await contract.deployTransaction.wait();


  console.log(`Contract deployed at address: ${txReceipt.contractAddress}`);
};

const transfer = async (contractAddress) => {
  const newAddress = '0x516923E55e9eD4Bcf08CFA4A477a11805b0CD72C'
  console.log(`Attempting to transfer contract to: ${newAddress}`);

  const deployedContract = new ethers.Contract('0x0a8C43A91594f315c85C2E1F84ed617EA550856c', abi, wallet);

  console.log(await deployedContract.increment(10));
  console.log(await deployedContract.number());
}

// 9. Call the deploy function
deploy();
//transfer();