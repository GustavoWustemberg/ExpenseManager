import express, {response, request} from "express";
import db from '../services/allAmountsService.js';

const router = express.Router();

router.get('/', async (request, response) => {
    const results = await db.findTotalRevenue();
  
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

  export default router;