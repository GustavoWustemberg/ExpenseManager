import express, { response, request } from "express";
import { body, validationResult } from "express-validator";
import db from '../services/expenditureService.js';

const router = express.Router();

router.post('/', [
    body('nameExpenditure').isLength({ min: 1 }).withMessage('O nome da desepesa deve ser preenchido'),
    body('amountExpenditure').isDecimal({ min: 1.00 }).withMessage('Cadastre uma despesa válida'),
], async (request, response) => {
    const { nameExpenditure, amountExpenditure, codUserExpenditure, typeExpenditure } = request.body;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    try {
        await db.insertExpenditure(nameExpenditure, amountExpenditure, codUserExpenditure, typeExpenditure);
        response.status(201).json({ message: "Despesa cadastrada com sucesso" });
    } catch (err) {
        response.status(500).json({ messege: `Encontramos um erro: ${err}` });
    }

});

router.put('/', [
    body('nameExpenditure').isLength({ min: 1 }).withMessage('O nome da desepesa deve ser preenchido'),
    body('amountExpenditure').isDecimal({ min: 1.00 }).withMessage('Cadastre uma despesa válida'),
], async (request, response) => {
    const { nameExpenditure, amountExpenditure, codUserExpenditure, typeExpenditure, idExpenditure } = request.body;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    try {
        await db.updateExpenditure(nameExpenditure, amountExpenditure, codUserExpenditure, typeExpenditure, idExpenditure);
        response.status(201).json({ message: "Despesa cadastrada com sucesso" });
    } catch (err) {
        response.status(500).json({ messege: `Encontramos um erro: ${err}` });
    }

});

router.get('/:idUser', async (request, response) => {
    const { idUser } = request.params;
    const results = await db.findExpenditure(idUser);

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

router.delete('/:idExpenditure', async (request, response) => {
    const { idExpenditure } = request.params;
    db.deleteExpenditure(idExpenditure);

    try {
        response.status(201).json({ messege: 'Despesa deletada com sucesso' });
    } catch (err) {
        response.status(500).json({ messege: `Encontramos um erro: ${err}` })
    }
});

export default router;