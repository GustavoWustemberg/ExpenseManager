import db from '../repository/conection.js';

async function selectLogin(email, password) {
    const conn = await db.connect();
    const sql = 'SELECT email, user_password FROM users_tbl WHERE email = ? AND user_password = ?';
    const dataLogin = [email, password];
    const [rows] = await conn.query(sql, dataLogin);
    conn.end();
    return rows;
}

async function redefinePassword(password, email) {
    const conn = await db.connect();
    const sql = 'UPDATE users_tbl SET user_password = ? WHERE email = ?';
    const dataLogin = [password, email];
    conn.query(sql, dataLogin)
    conn.end();

    return true
}

export default { selectLogin, redefinePassword };