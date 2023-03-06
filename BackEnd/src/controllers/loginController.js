import express from "express";
import { request } from "express";
import { body, validationResult } from "express-validator";
import { generateToken } from "../helpers/userfeatures.js";
import db from "../services/loginservice.js";
import { sendEmail } from "../helpers/sendemail.js";

const router = express.Router();

router.post('/', [
    body('email').isEmail().withMessage('Informe um email válido'),
], async (request, response) => {
    const { email, password } = request.body;
    const errors = validationResult(request);
    const results = await db.selectLogin(email, password);

    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    console.log(results);
    try {
        if (results == 0) {
            return response.status(401).json({ message: `Usuário ou senha inválido` });
        } else {
            const { email, userName } = results[0];
            const token = generateToken(email, userName);
            response.status(200).json({ message: 'Login efetuado com sucesso', token });
        }
    }
    catch (err) {
        response.status(500).json({ message: `Encontramos um erro: ${err}` });
    }

});

router.post('/reset', async (req, res) => {
    const { email } = req.body;
    console.log("aqui")
    const password = generatedPassword();

    const pswReseted = await db.redefinePassword(email, password)


    if (pswReseted) {
        sendEmail(email, password)
        console.log(sendEmail)
        res.status(200).json({
            message: `Senha atualizada`
        })
    }
})

export default router;