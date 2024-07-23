import express from 'express';
import MyAdsController from '../controllers/MyAdsController';

const myAdsController = new MyAdsController();

const myAdsRoutes = express.Router();

myAdsRoutes.get('/', myAdsController.index);

export default myAdsRoutes;
