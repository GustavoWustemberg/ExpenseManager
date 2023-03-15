import express from "express";
import user from './controllers/userController.js';
import revenue from './controllers/revenueController.js';
import allAmounts from './controllers/allAmountsController.js';
import login from './controllers/loginController.js';
import expenditure from "./controllers/expenditureController.js";
import validateEmail from "./controllers/validateEmailController.js";

const router = express.Router();

router.use('/user', user);
router.use('/revenue', revenue);
router.use('/expenditure', expenditure);
router.use('/login', login);
router.use('/all-amounts', allAmounts);
router.use('/validateEmail', validateEmail);

export default router;