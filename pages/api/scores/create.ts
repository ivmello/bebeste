import type { NextApiRequest, NextApiResponse } from 'next'
import { DateTime } from 'luxon';
import { query } from '../../../libs/db';
import { type } from 'os';

type Score = {
  id: number,
  user_id: number,
  date: string,
  drank: number,
  total: number,
  price_of_day: number,
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, date, drank } = req.body;

  let price;
  const formated_date = DateTime.fromISO(date).setZone("America/Campo_Grande").toISODate().toString();

  const prices: any = await query({
    query: `
      SELECT p.*
      FROM prices p
      WHERE date = ?
    `,
    values: [formated_date],
  });

  if (prices.length > 0) {
    price = prices[0].value;
  } else {
    const random_price = getRandomInt(1,5);
    price = random_price * 100;
    const created = await query({
      query: `
        INSERT INTO prices (date, value)
        VALUES (?, ?)
      `,
      values: [formated_date, price],
    });
  }

  const scores: any = await query({
    query: `
      SELECT s.*
      FROM scores s
      WHERE user_id = ?
      AND date = ?
    `,
    values: [user_id, formated_date],
  });

  const score_value_day = drank == 0 ? price : 0;

  if (scores.length > 0) {
    const score = scores[0];
    const updated = await query({
      query: `
        UPDATE scores
        SET date = ?, drank = ?, total = ?
        WHERE user_id = ? AND id = ?
      `,
      values: [date, drank, score_value_day, user_id, score.id],
    });
    res.status(201).json(updated);
  } else {
    const created = await query({
      query: `
        INSERT INTO scores (user_id, date, drank, price_of_day, total)
        VALUES (?, ?, ?, ?, ?)
      `,
      values: [user_id, formated_date, drank, price, score_value_day],
    });
    res.status(201).json(created);
  }

  res.status(500).json({
    error: 500,
    msg: 'Error on create record'
  });
}