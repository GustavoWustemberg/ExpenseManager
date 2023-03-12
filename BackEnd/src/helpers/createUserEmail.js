import nodemailer from "nodemailer";
import {config} from "../config/smtp.js";

const transporter = nodemailer.createTransport(config);

async function sendEmail(email, userName) {
    const mailSend = await transporter.sendMail({
        subject: `Criação de conta - Expense Manager`,
        from: `Suporte Expense Manager <managerexpense89@gmail.com>`,
        to: `${email}`,
        html: `
        <html>
            <body>
                <h2>Bem Vindo!</h2>
                <p> Olá ${userName}
                <br>Você se cadastrou com sucesso em nosso serviço.</p>
            </body>
        </html>
        `
    });

    console.log(mailSend)
}

export { sendEmail }