// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'GET'){
        const { ethAddress } = req.query;        

        const filePath = path.resolve('.', `user_contracts/contract_${ethAddress}.sol`);

        // * check to make sure the file exists
        if(!fs.existsSync(filePath)){
            return res.status(500).json({
                error: 'File does not exist'
            })
        }

        const fileBuffer = fs.readFileSync(filePath);

        res.setHeader('Content-Type', 'text');
        res.setHeader('Content-Disposition', `attachment; filename=contract_~${ethAddress}.sol`);
        return res.send(fileBuffer)

    } else {
        return res.status(400).json({ errorMessage: 'Must send GET to this endpoint' })
    }
}
