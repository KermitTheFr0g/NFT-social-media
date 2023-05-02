import { ethers } from "ethers";

const cryptoWallet = async (ethAddress: string) => {
    // * validate ethAddress
    if(!ethAddress){
        return {
            error: 'No ethAddress provided'
        }
    } else if(typeof ethAddress != 'string'){
        return {
            error: 'ethAddress must be a string'
        }
    } else if(!ethers.utils.isAddress(ethAddress)){
        return {
            error: 'ethAddress is not a valid address'
        }
    }

    const response = await fetch(`https://api.etherscan.io/api?
        module=account
        &address=${ethAddress}
        &apikey=${process.env.ETHERSCAN_API_KEY}`,
        {
            method: 'GET'
        }
    );

    const data = await response.json();
    console.log(data);
}


module.exports = cryptoWallet;