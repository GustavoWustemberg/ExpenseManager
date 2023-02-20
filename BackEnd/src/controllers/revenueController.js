import express, {response, request} from "express";
import { body, validationResult } from "express-validator";
import db from '../services/revenueService.js';

const router = express.Router();

router.post('/', [
    body('monthlyAmount').isDecimal({ min: 1.00 }).withMessage('Cadastre uma renda mensal válida'),
  ], async (request, response) => {
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

export default router;