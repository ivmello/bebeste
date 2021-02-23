import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../libs/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await query({
    query: `
      SELECT s.*
      FROM scores s
    `,
    values: [],
  });
  res.status(200).json(result)
}