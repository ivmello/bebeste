import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../libs/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await query({
    query: `
      SELECT u.*, SUM(s.total) as total, s.price_of_day as price_of_day
      FROM users u
      LEFT JOIN scores s ON s.user_id = u.id
      GROUP BY u.id
    `,
    values: [],
  });
  res.status(200).json(result)
}
