import express from 'express';
import PasswordController from '../controllers/passwordController';

const passwordRoutes = express.Router();
const passwordController = new PasswordController();

passwordRoutes.post('/', passwordController.change);

export default passwordRoutes;
