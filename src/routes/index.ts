import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../swagger.config';
import offersRoutes from './offersRoutes';
import myAdsRoutes from './myAdsRoutes';
import loginRoutes from './loginRoutes';
import registerRoutes from './registerRoutes';

const api = express.Router();

// ----------------------- Login ------------------------------
api.use('/login', loginRoutes);

// ------------------------ Register --------------------------
api.use('/register', registerRoutes);

// ------------------------ Offers -------------------------------
api.use('/offers', offersRoutes);

// ------------------------ MyAds -----------------------------
api.use('/myAds', myAdsRoutes);

// ------------------------ Swagger ---------------------------
function initializeSwagger() {
  const configSwagger = swaggerJSDoc(swaggerOptions);
  api.use('/swagger', swaggerUi.serve, swaggerUi.setup(configSwagger));
}
initializeSwagger();

export default api;
