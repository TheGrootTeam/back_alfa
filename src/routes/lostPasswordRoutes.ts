import express from 'express';
import LostPasswordController from '../controllers/LostPasswordController';

const lostPasswordRoutes = express.Router();
const lostPasswordController = new LostPasswordController();

lostPasswordRoutes.get('/:email', lostPasswordController.email);
lostPasswordRoutes.post('/', lostPasswordController.renewPassword);

export default lostPasswordRoutes;
