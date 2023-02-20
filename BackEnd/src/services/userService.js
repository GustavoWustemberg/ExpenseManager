import database from "../repository/conection.js";

async function insertUser(userName, email, password) {
    const conn =  await database.connect();

    const sql = 'INSERT INTO users_tbl(user_name, email, user_password) VALUES(?,?,?);';
    const dataUser = [userName, email, password];
  
    await conn.query(sql, dataUser);

    console.log(userName, email, password)
    
    conn.end();
}

async function findUser() {
    const conn = await database.connect();
    const sql = 'SELECT user_name, email FROM users_tbl';
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

export default {insertUser, findUser};