import express from 'express';
import OffersController from '../controllers/OffersController';

const offersController = new OffersController();

const offersRoutes = express.Router();

offersRoutes.get('/', offersController.index);

export default offersRoutes;
