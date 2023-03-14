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

        // todo check to make sure the files exists

        const filePath = path.resolve('.', `user_contracts/contract_${ethAddress}.sol`);
        const fileBuffer = fs.readFileSync(filePath);

        res.setHeader('Content-Type', 'text');
        res.setHeader('Content-Disposition', `attachment; filename=contract_~${ethAddress}.sol`);
        return res.send(fileBuffer)

    } else {
        return res.status(400).json({ errorMessage: 'Must send GET to this endpoint' })
    }
}
