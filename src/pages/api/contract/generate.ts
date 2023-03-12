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
       console.log(generateContract);

        // deploy smart contract to network
        // in this case we will deploy to the testnet
        
        // todo run the deploy script
        try {
            var deployedContract = await contractDeployment(generateContract.contractID, configParams.contractName, ethAddress, 'ipfs://123');
        } catch(error){
            return res.status(500).json({
                error: error
            })
        }
        
        
        return res.status(200).json({
            success: true,
            message: 'Conctract Deployed',
            contractAddress: await deployedContract.contractAddress
        })
        
    } else {
        return res.status(400).json({ errorMessage: 'Must send POST to this endpoint' })
    }
}
