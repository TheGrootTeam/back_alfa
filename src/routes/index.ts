import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../swagger.config';
import offersRoutes from './offersRoutes';
import infoDashboardsRoutes from './infoDashboardsRoutes';
import loginRoutes from './loginRoutes';
import registerRoutes from './registerRoutes';
import profileRoutes from './profileRoutes';
import authJWT from '../middlewares/authJWT';

const api = express.Router();

// ----------------------- Login ------------------------------
api.use('/login', loginRoutes);

// ---------------------- Register ----------------------------
api.use('/register', registerRoutes);

// --------------------- Profile Update -----------------------
api.use('/profile', profileRoutes); 

// ------------------------ Offers -------------------------------
api.use('/offers', offersRoutes);

// ------------------------ InfoDashboards -----------------------------
api.use('/infoDashboards', authJWT, infoDashboardsRoutes);

// ------------------------ Swagger ---------------------------
function initializeSwagger() {
  const configSwagger = swaggerJSDoc(swaggerOptions);
  api.use('/swagger', swaggerUi.serve, swaggerUi.setup(configSwagger));
}
initializeSwagger();

export default api;
