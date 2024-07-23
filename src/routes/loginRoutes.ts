import express from 'express';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();

const loginRoutes = express.Router();

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

loginRoutes.get('/', loginController.index);

export default loginRoutes;
