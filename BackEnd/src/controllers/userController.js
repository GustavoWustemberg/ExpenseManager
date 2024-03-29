import express, { response } from "express";
import { body, validationResult } from "express-validator";
import { request } from "express";
import db from "../services/userService.js";
import { sendEmail } from "../helpers/createUserEmail.js";

const router = express.Router();

router.post('/', [
    body('email').isEmail().withMessage('Informe um Email válido'),
    body('password').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('A senha deve conter no mínimo 8 caracteres. Podendo ser letras maiúsculas ou minúsculas, números e caracteres especiais'),
], async (request, response) => {
    const { userName, email, password } = request.body;

    const erros = validationResult(request);

    if(!erros.isEmpty()) {
        return response.status(400).json({message: erros.array()});
    }

    try {
        await db.insertUser(userName, email, password);
        
        if(response.status(201)){
          await sendEmail(email, userName)
          response.status(201).json({message: 'Usuário cadastrado com sucesso'});
        }
        console.log(sendEmail)
    } catch(err) {
        response.status(500).json({message:`Encontramos um erro: ${err}`})
    }
});

router.get('/', async (request, response) => {
    const results = await db.findUser();

    try {
        if (results.length == 0) {
          response.status(204).end();
        } else {
          response.status(200).json(results);
        }
      }
      catch (err) {
        response.status(500).json({ message: `Encontramos um erro: ${err}` });
      }
});

router.put('/', [
  body('email').isEmail().withMessage('Informe um Email válido'),
  body('password').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('A senha deve conter no mínimo 8 caracteres. Podendo ser letras maiúsculas ou minúsculas, números e caracteres especiais'),
], async (request, response) => {
  const { userName, email, password, idUser } = request.body;

  const erros = validationResult(request);

  if(!erros.isEmpty()) {
      return response.status(400).json({message: erros.array()});
  }

  try {
      await db.updateUser(userName, email, password, idUser);
      response.status(201).json({message: 'Usuário atualizado com sucesso'});
  } catch(err) {
      response.status(500).json({message:`Encontramos um erro: ${err}`})
  }
});

router.delete('/:idUser', async (request, response) => {
  const {idUser} = request.params;
  db.deleteUser(idUser);

  try {
    response.status(201).json({messege: 'Usuário deletado com sucesso'});
  } catch(err) {
    response.status(500).json({messege: `Encontramos um erro: ${err}`})
  }
});

export default router;