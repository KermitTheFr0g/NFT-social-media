// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../utils/database';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { rows } = await db.query('SELECT * FROM users');
  console.log(rows)

  res.status(200).json({ users: rows })
}
