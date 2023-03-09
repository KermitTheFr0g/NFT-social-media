const deployContract = require('./utils/contract/deploy');
const { resolve } = require('path');

async function main(){
    const deployedContract = await deployContract(`${resolve('./user_contracts/contract_0x516923E55e9eD4Bcf08CFA4A477a11805b0CD72C.sol')}`, 'GunKillers', '123', 'ipfs://123');
}

main();