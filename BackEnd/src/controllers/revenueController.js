import express, {response, request} from "express";
import { body, validationResult } from "express-validator";
import db from '../services/revenueService.js';

const router = express.Router();

router.post('/', async (request, response) => {
    const {codUser, monthlyAmount, extraIncome} = request.body;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }

    try {
        await db.insertRevenue(codUser, monthlyAmount, extraIncome);
        response.status(201).json({message: "Renda cadastrada com sucesso"});
    } catch(err) {
        response.status(500).json({messege: `Encontramos um erro: ${err}`});
    }
    
});

router.put('/', async (request, response) => {
  const {codUser, monthlyAmount, extraIncome, idRevenue} = request.body;

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ message: errors.array() });
  }

  try {
      await db.updateRevenue(codUser, monthlyAmount, extraIncome, idRevenue);
      response.status(201).json({message: "Renda atualizada com sucesso"});
  } catch(err) {
      response.status(500).json({messege: `Encontramos um erro: ${err}`});
  }
  
});

router.get('/', async (request, response) => {
  const results = await db.findRevenue();

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

router.delete('/:idRevenue', async (request, response) => {
  const {idRevenue} = request.params;
  db.deleteRevenue(idRevenue);

  try {
    response.status(201).json({messege: 'Renda deletada com sucesso'});
  } catch(err) {
    response.status(500).json({messege: `Encontramos um erro: ${err}`})
  }
});

export default router;