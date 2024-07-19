import express from'express';
import { controllers } from '../controllers';

const api = express.Router();

// --------------- Instantiating controllers ------------------
const myAdsController = new controllers.MyAds();
const loginController = new controllers.Login();
const adsController = new controllers.Ads();

// Login
api.get('/login', loginController.index)

// Ads
api.get('/ads', adsController.index)

// MyAds
api.get('/myAds', myAdsController.index)

export default api;
