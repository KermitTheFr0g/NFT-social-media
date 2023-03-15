// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../../utils/database';

import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'GET'){
        const { ethAddress } = req.query;

        const { rows } = await db.query('SELECT * FROM projects WHERE "ownerAddress" = $1', [ethAddress]);

        if(rows.length == 0){
            return res.status(200).json({
                message: 'no data'
            })
        }

        return res.status(200).json({ rows: rows })

    } else {
        return res.status(400).json({ errorMessage: 'Must send GET to this endpoint' })
    }
}