import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../../utils/database';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'GET'){
        const { ethAddress } = req.query;

        // * gets rows of data with search for the owner address in projects
        //const { rows } = await db.query('SELECT * FROM projects WHERE "ownerAddress" = $1;', [ethAddress]);

        // * validate ethAddress
        if(!ethAddress){
            return res.status(400).json({
                error: 'No ethAddress provided'
            })
        } else if(typeof ethAddress != 'string'){
            return res.status(400).json({
                error: 'ethAddress must be a string'
            })
        }

        const projects = await prisma.project.findMany({
            where: {
                ownerAddress: ethAddress
            }
        })

        if(projects.length == 0){
            return res.status(200).json({
                project: false
            })
        }

        return res.status(200).json({ project: projects[projects.length - 1] })

    } else {
        return res.status(400).json({ errorMessage: 'Must send GET to this endpoint' })
    }
}
