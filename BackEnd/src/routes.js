import express from "express";
import user from './controllers/userController.js';

const router = express.Router();

router.use('/user', user);

export default router;