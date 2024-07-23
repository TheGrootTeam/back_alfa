import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../swagger.config';
import adsRoutes from './adsRoutes';
import myAdsRoutes from './myAdsRoutes';
import loginRoutes from './loginRoutes';

const api = express.Router();

// ----------------------- Login ------------------------------
api.use('/login', loginRoutes);

// ------------------------ Ads -------------------------------
api.use('/ads', adsRoutes);

// ------------------------ MyAds -----------------------------
api.use('/myAds', myAdsRoutes);

// ------------------------ Swagger ---------------------------
function initializeSwagger() {
  const configSwagger = swaggerJSDoc(swaggerOptions);
  api.use('/swagger', swaggerUi.serve, swaggerUi.setup(configSwagger));
}
initializeSwagger();

export default api;
