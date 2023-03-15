import db from "../repository/connection.js";

async function selectEmail(email) {
  const conn = await db.connect();
  const sql = 'SELECT email FROM users_tbl WHERE email = ?';
  const dataSelectEmail = [email];
  const [rows] = await conn.query(sql, dataSelectEmail);
  conn.end();
  return rows;
}

export default { selectEmail };