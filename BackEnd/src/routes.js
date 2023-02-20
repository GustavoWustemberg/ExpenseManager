import express from "express";
import user from './controllers/userController.js';
import revenue from './controllers/revenueController.js';

const router = express.Router();

router.use('/user', user);
router.use('/revenue', revenue);

export default router;