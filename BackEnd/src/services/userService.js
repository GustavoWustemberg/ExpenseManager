import database from "../repository/connection.js";

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

async function updateUser(userName, email, password, idUser) {
    const conn =  await database.connect();

    const sql = 'UPDATE users_tbl SET user_name = ?, email = ?, user_password = ? WHERE user_id = ?'
    const dataUser = [userName, email, password, idUser];

    await conn.query(sql, dataUser);

    console.log(userName, email, password);


    conn.end();
}

async function deleteUser(idUser) {
    const conn = await database.connect();

    const sql = 'DELETE from users_tbl WHERE user_id = ?';
    const dataUser = [idUser];

    await conn.query(sql, dataUser);

    conn.end();
}

export default {insertUser, findUser, updateUser, deleteUser};