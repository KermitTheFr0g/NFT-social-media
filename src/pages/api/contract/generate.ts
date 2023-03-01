// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == 'POST'){
        // take input from post request

        // validate input from request
        
        // generate contract and save in backend
        // save under the name of user address

        // deploy smart contract to network
        // in this case we will deploy to the testnet

        res.status(200).json({ name: 'John Doe' })
        
    } else {
        return res.status(400).json({ errorMessage: 'Must send POST to this endpoint' })
    }
}
