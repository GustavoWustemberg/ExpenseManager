import database from "../repository/conection.js";

async function insertRevenue(codUser, monthlyAmount, extraIncome) {
    const conn = await database.connect();

    const sql = 'INSERT INTO revenue_tbl(FK_cod_user_revenue, monthly_amount, extra_income) VALUES (?,?,?);';
    const dataRevenue = [codUser, monthlyAmount, extraIncome];

    await conn.query(sql, dataRevenue);
    console.log(dataRevenue);

    conn.end();
}

export default {insertRevenue};