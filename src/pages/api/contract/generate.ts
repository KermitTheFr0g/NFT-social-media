// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const contractValidation = require('../../../../utils/validation/contract');
const contractGeneration = require('../../../../utils/contractGeneration');

const contractDeployment = require('../../../../utils/contract/deploy');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'POST'){
        // take input from post request
        const { ethAddress } = req.query;
        const configParams = req.body;

        console.log(ethAddress);
        console.log(configParams);

        // validate input from request
        const validateContract = contractValidation(configParams);
        if(validateContract.error){
            return res.status(400).json({
                error: validateContract.error
            })
        }

        // generate contract and save in backend
        // save under the name of user address
        const generateContract = await contractGeneration(configParams, ethAddress);
        
        // deploy smart contract to network
        // in this case we will deploy to the testnet
        // todo find out how to deploy a contract to the 
        
        console.log(process.env.PWD + '/user_contracts/copntractpoopy.sol');

        // todo run the deploy script
        try {
            var deployedContract = await contractDeployment(`${process.env.PWD}/user_contracts/contract_0x516923E55e9eD4Bcf08CFA4A477a11805b0CD72C.sol`, 'GunKillers', '123', 'ipfs://123');
        } catch(error){
            return res.status(500).json({
                error: error
            })
        }
        
        
        return res.status(200).json({ 
            message: 'Conctract Deployed',
            contractAddress: await deployedContract.contractAddress
        })
        
    } else {
        return res.status(400).json({ errorMessage: 'Must send POST to this endpoint' })
    }
}
