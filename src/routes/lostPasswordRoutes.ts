import express from 'express';
import LostPasswordController from '../controllers/LostPasswordController';

const lostPasswordRoutes = express.Router();
const lostPasswordController = new LostPasswordController();

lostPasswordRoutes.get('/:email', lostPasswordController.index);

export default lostPasswordRoutes;
