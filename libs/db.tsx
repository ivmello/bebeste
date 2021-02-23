// db.js
import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    // host: process.env.MYSQL_HOST,
    // port: Number(process.env.MYSQL_PORT),
    // database: process.env.MYSQL_DATABASE,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD
    host: '165.227.68.74',
    port: 3306,
    database: 'nextjs-external',
    user: 'shapeweb2',
    password: 'sh615243'
  }
});
export async function query({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}