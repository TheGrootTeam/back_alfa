import express from 'express';
import LostPasswordController from '../controllers/LostPasswordController';

const lostPasswordRoutes = express.Router();
const lostPasswordController = new LostPasswordController();

lostPasswordRoutes.get('/', lostPasswordController.index);

export default lostPasswordRoutes;
