import nodemailer from "nodemailer";
import {config} from "../config/smtp.js";

const transporter = nodemailer.createTransport(config);

async function sendEmail(email, newPassword) {
    await transporter.sendMail({
        subject: `Usuário casdastrado com sucesso - Expense Manager`,
        from: `Suporte Expense Manager <managerexpense89@gmail.com>`,
        to: `${email}`,
        html: `
        <html>
            <body>
                <p> Olá usuário!
                <br>Você solicitou a alteração da sua senha. Sua nova senha de acesso é: <h3> ${newPassword} </h3> </p>
                <a href="#"> Clique aqui para acessar o site </a>
            </body>
        </html>
        `
    });
}

export {sendEmail}