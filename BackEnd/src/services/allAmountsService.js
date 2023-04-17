import database from "../repository/connection.js";

async function findTotalRevenue(idUser) {
    const conn = await database.connect();
    const sql = 'SELECT user_name, monthly_amount, extra_income, SUM(amount_expenditure), revenue_id, date_revenue, date_expenditure FROM users_tbl INNER JOIN revenue_tbl ON users_tbl.user_id = revenue_tbl.FK_cod_user_revenue INNER JOIN expenditure_tbl ON users_tbl.user_id = expenditure_tbl.FK_cod_user_expenditure WHERE user_id = ?;';
    const dataAllAmounts = [idUser];
    const [rows] = await conn.query(sql, dataAllAmounts);
    conn.end();

    return rows;
}

export default { findTotalRevenue };