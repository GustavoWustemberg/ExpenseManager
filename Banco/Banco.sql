# Criação do Banco
CREATE DATABASE expenseManager;

# Inicialização do Banco
USE expenseManager;

# Tabela de Usuário
CREATE TABLE users_tbl (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    user_password VARCHAR(45) NOT NULL
);

# Tabela de Receita/Renda
CREATE TABLE revenue_tbl (
	revenue_id INT PRIMARY KEY AUTO_INCREMENT,
	FK_cod_user_revenue INT NOT NULL,
    monthly_amount DECIMAL(10,2) NOT NULL,
	extra_income DECIMAL(10,2),
    date_revenue DATE NOT NULL,
    CONSTRAINT FK_cod_user_revenue FOREIGN KEY (FK_cod_user_revenue) REFERENCES users_tbl(user_id)
);

# Tabela de Tipo de Despesas/Gastos
CREATE TABLE type_expenditure_tbl (
	type_expenditure_id INT PRIMARY KEY AUTO_INCREMENT,
    name_expendirure VARCHAR(45) NOT NULL
);

# Tabela de Despesas/Gastos
CREATE TABLE expenditure_tbl (
	expenditure_id INT PRIMARY KEY AUTO_INCREMENT,
    name_expenditure VARCHAR(45) NOT NULL,
    amount_expenditure DECIMAL(10,2) NOT NULL,
    FK_cod_user_expenditure INT NOT NULL,
    FK_type_expenditure INT NOT NULL,
    date_expenditure DATE NOT NULL,
    
    CONSTRAINT FK_cod_user_expenditure FOREIGN KEY (FK_cod_user_expenditure) REFERENCES users_tbl(user_id),
    CONSTRAINT FK_type_expenditure FOREIGN KEY (FK_type_expenditure) REFERENCES type_expenditure_tbl(type_expenditure_id)
);
