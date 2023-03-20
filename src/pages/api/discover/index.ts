import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../../utils/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'GET'){

        // todo look into db and see 

        const {rows} = await db.query('SELECT * FROM projects LIMIT 10');

        return res.json({
            Projects: rows
        })

    } else {
        return res.status(400).json({ errorMessage: 'Must send GET to this endpoint' })
    }
}
