import database from '../repository/conection.js';

async function insertExpenditure(nameExpenditure, amountExpenditure, codUserExpenditure, typeExpenditure) {
    const conn = await database.connect();

    const sql = 'INSERT INTO expenditure_tbl (name_expenditure, amount_expenditure, FK_cod_user_expenditure, FK_type_expenditure, date_expenditure) VALUES (?,?,?,?,CURDATE())';

    const dataExpenditure = [nameExpenditure, amountExpenditure, codUserExpenditure, typeExpenditure];
    await conn.query(sql, dataExpenditure);

    console.log(dataExpenditure);

    conn.end();
}

async function updateExpenditure(nameExpenditure, amountExpenditure, codUserExpenditure, typeExpenditure, idExpenditure) {
    const conn = await database.connect();

    const sql = 'UPDATE expenditure_tbl SET name_expenditure = ?, amount_expenditure = ?, FK_cod_user_expenditure = ?, FK_type_expenditure = ?, date_expenditure = CURDATE() WHERE expenditure_id = ?';

    const dataExpenditure = [nameExpenditure, amountExpenditure, codUserExpenditure, typeExpenditure, idExpenditure];

    await conn.query(sql, dataExpenditure);

    conn.end();
}

async function findExpenditure() {
    const conn =  await database.connect();

    const sql = 'SELECT * FROM expenditure_tbl';
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function deleteExpenditure(idExpenditure) {
    const conn = await database.connect();

    const sql = 'DELETE from expenditure_tbl WHERE expenditure_id = ?';
    const dataExpenditure = [idExpenditure];

    await conn.query(sql, dataExpenditure);

    conn.end();
}

export default {insertExpenditure, updateExpenditure, findExpenditure, deleteExpenditure};