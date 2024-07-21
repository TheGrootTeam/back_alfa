import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../swagger.config';
import { controllers } from '../controllers';

const api = express.Router();

// --------------- Instantiating controllers ------------------
const myAdsController = new controllers.MyAds();
const loginController = new controllers.Login();
const adsController = new controllers.Ads();

// ----------------------- Login ------------------------------
/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          description: authorization token
 *      example:
 *        token: dsfoig324okjtl24
 *    Error:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          description: Error message
 *      example:
 *        error: wrong password
 */

/**
 * @swagger
 * tags:
 *    name: Login
 *    description: Login Endpoints
 */

/**
 * @swagger
 * /api/v1/login:
 *  get:
 *    summary: Login
 *    tags: [Login]
 *    responses:
 *      200:
 *        description: loged
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Login'
 *              description: response of Login
 *
 *      401:
 *        description: unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Error'
 *              description: unauthorized message
 *
 */
api.get('/login', loginController.index);

// ------------------------ Ads -------------------------------
api.get('/ads', adsController.index);

// ------------------------ MyAds -----------------------------
api.get('/myAds', myAdsController.index);

// ------------------------ Swagger ---------------------------
function initializeSwagger() {
  const configSwagger = swaggerJSDoc(swaggerOptions);
  api.use('/swagger', swaggerUi.serve, swaggerUi.setup(configSwagger));
}
initializeSwagger();

export default api;
