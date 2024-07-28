import express from 'express';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();

const registerRoutes = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Register:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: registration status message
 *      example:
 *        message: User registered successfully
 *    Error:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          description: Error message
 *      example:
 *        error: registration error
 */

/**
 * @swagger
 * tags:
 *    name: Register
 *    description: Registration Endpoints
 */

/**
 * @swagger
 * /api/v1/register:
 *  post:
 *    summary: Register
 *    tags: [Register]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              dniCif:
 *                type: string
 *              password:
 *                type: string
 *              isCompany:
 *                type: boolean
 *              email:
 *                type: string
 *    responses:
 *      201:
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Register'
 *
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Error'
 *
 */

registerRoutes.post('/', loginController.register);

export default registerRoutes;
