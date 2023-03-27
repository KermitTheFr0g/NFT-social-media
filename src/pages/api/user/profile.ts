import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../../utils/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'GET'){
        const { ethAddress } = req.query;

        const { rows } = await db.query('SELECT * FROM projects WHERE "ownerAddress" = $1 LIMIT 1;', [ethAddress]);

        if(rows.length == 0){
            return res.status(200).json({
                project: false
            })
        }

        return res.status(200).json({ project: rows[rows.length - 1] })

    } else {
        return res.status(400).json({ errorMessage: 'Must send GET to this endpoint' })
    }
}
