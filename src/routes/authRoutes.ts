import express from 'express';
import AuthController from '../controllers/authController';

const authController = new AuthController();

const authRoutes = express.Router();
authRoutes.get('/', authController.index);

export default authRoutes;
