import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../libs/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req

  const result: any = await query({
    query: `
      SELECT u.*, SUM(s.total) as total, s.price_of_day as price_of_day
      FROM users u
      LEFT JOIN scores s ON s.user_id = u.id
      WHERE u.id = ?
      GROUP BY u.id
    `,
    values: [uid],
  });
  let user = null;
  if (result.length > 0) {
    user = result[0];
  }
  res.status(200).json(user)
}
