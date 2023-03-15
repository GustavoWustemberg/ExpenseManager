import express from "express";
import { body, validationResult } from "express-validator";
import db from "../services/validateEmailService.js";

const router = express.Router();

router.post('/', async (request, response) => {
  const {email} = request.body;
  const errors = validationResult(request);
  

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }


  try {

    const results = await db.selectEmail(email);

    if (results == 0) {
      return response.status(200).json({ message: "email ainda não cadastrados!" });
    }
    else {
      return response.status(401).json({ message: "email já utilizado!"});
    }
  }
  catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }

});

export default router;