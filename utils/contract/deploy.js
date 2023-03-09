require('dotenv').config({ path: '../../.env' });
const contractCompiler = require('./compile');
const ethers = require('ethers');

//todo look into transfering ownership of contract to new user

// url for sepolia rpc
const url = 'https://rpc2.sepolia.org';
// provider for sepolia
const provider = new ethers.providers.JsonRpcProvider(url);

// account with funds to deploy contract
const account_from = {
    privateKey: process.env.PRIVATE,
}

const deployContract = async (contractPath, className, userAddress, ipfsAddress) => {
    const contractFile = contractCompiler(contractPath, className);

    // bytecode and abi from compiled contract
    const bytecode = contractFile.evm.bytecode.object;
    const abi = contractFile.abi;

    // access wallet to deploy contract
    let wallet = new ethers.Wallet(account_from.privateKey, provider);

    // logic for deploying contract
    const userContractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

    const contract = await userContractFactory.deploy(ipfsAddress, ipfsAddress);
    const txReceipt = await contract.deployTransaction.wait();

    console.log(`Contract deployed at address: ${txReceipt.contractAddress}`);

    return {
        contractAddress: txReceipt.contractAddress
    }
}

module.exports = deployContract;