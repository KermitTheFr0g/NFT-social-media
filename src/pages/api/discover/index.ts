import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../../utils/database';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'GET'){

        // todo look into db and see 

        const projects = await prisma.project.findMany();

        return res.json({
            Projects: projects
        })

    } else {
        return res.status(400).json({ errorMessage: 'Must send GET to this endpoint' })
    }
}
