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
import authRoutes from './authRoutes';
import deleteProfileRoutes from './deleteProfileRoutes';
import passwordRoutes from './passwordRoutes';
import searchRoutes from './searchRoutes';
import emailRoutes from './emailRoutes';
import sendMailRoutes from './sendMailRoutes';

const api = express.Router();

// ----------------------- Login ------------------------------
api.use('/login', loginRoutes);

// ---------------------- Register ----------------------------
api.use('/register', registerRoutes);

// ---------------------- Auth --------------------------------
api.use('/auth', authJWT, authRoutes);

// --------------------- Profile Update -----------------------
api.use('/profile', profileRoutes);

// --------------------- Delete Profile ------------------------
api.use('/delete-profile', deleteProfileRoutes);

// ---------------------- Change Password ---------------------
api.use('/changePassword', authJWT, passwordRoutes);

// ------------------------ Offers -------------------------------
api.use('/offers', offersRoutes);

// ------------------------ InfoDashboards -----------------------------
api.use('/infoDashboards', authJWT, infoDashboardsRoutes);

// ------------------------ Search ------------------------------
api.use('/search', searchRoutes);

// ---------------------- Emails -------------------------------
api.use('/emails', emailRoutes); 
api.use('/send-email', sendMailRoutes); 

// ------------------------ Swagger ---------------------------
function initializeSwagger() {
  const configSwagger = swaggerJSDoc(swaggerOptions);
  api.use('/swagger', swaggerUi.serve, swaggerUi.setup(configSwagger));
}
initializeSwagger();

export default api;
