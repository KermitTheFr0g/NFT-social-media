// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const db = require('../../../../utils/database');

const contractValidation = require('../../../../utils/validation/contract');
const contractGeneration = require('../../../../utils/contractGeneration');

const contractDeployment = require('../../../../utils/contract/deploy');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'POST'){
        // * set variable from query 
        const { ethAddress } = req.query;
        // * set object variable from body
        const configParams = req.body;

        // * validate input from request
        const validateContract = contractValidation(configParams);
        if(validateContract.error){
            console.error(`Error - ${validateContract.error}`)
            return res.status(400).json({
                error: validateContract.error
            })
        }

        // * generate contract and save in backend
        // * save under the name of user address
        const generateContract = await contractGeneration(configParams, ethAddress);
        console.log(generateContract);

        
        // * try to deploy contaract to the blockchain
        try {
            var deployedContract = await contractDeployment(generateContract.contractID, configParams.contractName, ethAddress, 'ipfs://123');
        } catch(error){
            return res.status(500).json({
                error: error
            })
        }
        
        // * insert into project table
        await db.query(`INSERT INTO projects 
            ("projectName", "projectDescription", "contractAddress", "ownerAddress", "ethPrice") 
            VALUES ($1, $2, $3, $4, $5)`,
        [
            configParams.projectName,
            configParams.projectDescription,
            await deployedContract.contractAddress,
            ethAddress,
            parseFloat(configParams.mintPrice)
        ]);
        
        // * return success back to the user
        return res.status(200).json({
            success: true,
            message: 'Contract Deployed',
            contractAddress: await deployedContract.contractAddress
        })
        
    } else {
        return res.status(400).json({ errorMessage: 'Must send POST to this endpoint' })
    }
}
