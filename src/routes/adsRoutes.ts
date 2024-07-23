import express from 'express';
import AdsController from '../controllers/AdsController';

const adsController = new AdsController();

const adsRoutes = express.Router();

adsRoutes.get('/', adsController.index);

export default adsRoutes;
