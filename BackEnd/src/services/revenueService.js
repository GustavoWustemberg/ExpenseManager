import database from "../repository/connection.js";

async function insertRevenue(codUser, monthlyAmount, extraIncome) {
    const conn = await database.connect();

    const sql = 'INSERT INTO revenue_tbl(FK_cod_user_revenue, monthly_amount, extra_income, date_revenue) VALUES (?,?,?, CURDATE());';
    const dataRevenue = [codUser, monthlyAmount, extraIncome];

    await conn.query(sql, dataRevenue);
    console.log(dataRevenue);

    conn.end();
}

async function updateRevenue(codUser, monthlyAmount, extraIncome, idRevenue) {
    const conn = await database.connect();

    const sql = 'UPDATE revenue_tbl SET FK_cod_user_revenue = ?, monthly_amount = ?, extra_income = ? WHERE revenue_id = ?';

    const dataRevenue = [codUser, monthlyAmount, extraIncome, idRevenue];
    await conn.query(sql, dataRevenue);
    console.log(dataRevenue);

    conn.end();
}

async function findRevenue() {
    const conn = await database.connect();
    const sql = 'SELECT * FROM revenue_tbl';
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function deleteRevenue(idRevenue) {
    const conn = await database.connect();

    const sql = 'DELETE from revenue_tbl WHERE revenue_id = ?';
    const dataRevenue = [idRevenue];

    await conn.query(sql, dataRevenue);

    conn.end();
}

export default { insertRevenue, updateRevenue, findRevenue, deleteRevenue };