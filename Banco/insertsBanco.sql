# Inserção na tabela de usuário
INSERT INTO users_tbl (user_name, email, user_password) VALUES ("GustavoWustemberg", "gustavowustemberg14@gmail.com", "GustavolasBackEndLegend2023.");
SELECT * FROM users_tbl;

# Inserção na tabela de receita
INSERT INTO revenue_tbl (cod_user_revenue, monthly_amount, extra_income, date_revenue) VALUES (1, 1880.00, 100.00, NOW());
SELECT monthly_amount, extra_income FROM revenue_tbl;
SELECT user_name, monthly_amount, extra_income, SUM(amount_expenditure) FROM users_tbl
INNER JOIN revenue_tbl ON users_tbl.user_id = revenue_tbl.FK_cod_user_revenue
INNER JOIN expenditure_tbl ON users_tbl.user_id = expenditure_tbl.FK_cod_user_expenditure;

#UPDATE revenue_tbl SET FK_cod_user_revenue = 1, monthly_amount = 2000.00, extra_income = 550.00 WHERE revenue_id = 2;

# Inserção na tabela de Tipo de Despesas/Gastos
INSERT INTO type_expenditure_tbl (name_expendirure) VALUES ("Despesa Fixa"), ("Despesa Variável");
SELECT * FROM type_expenditure_tbl;

# Inserção na tabela de Despesas/Gastos
INSERT INTO expenditure_tbl (name_expenditure, amount_expenditure, FK_cod_user_expenditure, FK_type_expenditure, date_expenditure) VALUES
("Internet", 100.00, 1, 1, "2023-03-10T03:00:00.000Z"),
("Compra de Pizza", 54.00, 1, 2, now());
SELECT * FROM expenditure_tbl where FK_cod_user_expenditure = 1;

# Exemplo de JOIN em todas as tabelas
SELECT user_name, monthly_amount, extra_income, amount_expenditure FROM users_tbl
INNER JOIN revenue_tbl ON users_tbl.user_id = revenue_tbl.FK_cod_user_revenue
INNER JOIN expenditure_tbl ON users_tbl.user_id = expenditure_tbl.FK_cod_user_expenditure;

# Total da receita sem a substração dos gastos
SELECT user_name AS Nome_Usuario, SUM(extra_income) + SUM(monthly_amount) AS Total_Receita FROM revenue_tbl
INNER JOIN users_tbl ON users_tbl.user_id = revenue_tbl.FK_cod_user_revenue;

# Total da receita após substração dos gastos
SELECT user_name AS Nome_Usuario, (SELECT SUM(extra_income) + SUM(monthly_amount) FROM revenue_tbl) - SUM(amount_expenditure) AS Total_Receita FROM users_tbl
INNER JOIN expenditure_tbl ON users_tbl.user_id = expenditure_tbl.FK_cod_user_expenditure;

# Total de gastos;
SELECT user_name AS Nome_Usuario, SUM(amount_expenditure) AS Total_Gastos FROM users_tbl
INNER JOIN expenditure_tbl ON users_tbl.user_id = expenditure_tbl.FK_cod_user_expenditure;

SELECT user_name, monthly_amount, SUM(extra_income), SUM(amount_expenditure) FROM users_tbl INNER JOIN revenue_tbl ON users_tbl.user_id = revenue_tbl.FK_cod_user_revenue INNER JOIN expenditure_tbl ON users_tbl.user_id = expenditure_tbl.FK_cod_user_expenditure WHERE user_id = 1;