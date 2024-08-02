import express from 'express';
import RegisterController from '../controllers/RegisterController';

//const registerController = new RegisterController();
const registerRoutes = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Register:
 *      type: object
 *      properties:
 *        dniCif:
 *          type: string
 *          description: DNI/CIF of the user
 *        password:
 *          type: string
 *          description: Password of the user
 *        isCompany:
 *          type: boolean
 *          description: Flag to indicate if the user is a company
 *        email:
 *          type: string
 *          description: Email of the user
 *      required:
 *        - dniCif
 *        - password
 *        - isCompany
 *        - email
 *      example:
 *        dniCif: "12345678A"
 *        password: "password123"
 *        isCompany: false
 *        email: "user@example.com"
 */

/**
 * @swagger
 * tags:
 *    name: Register
 *    description: Register Endpoints
 */

/**
 * @swagger
 * /api/v1/register:
 *  post:
 *    summary: Register a new user
 *    tags: [Register]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *    responses:
 *      201:
 *        description: User registered successfully
 *      400:
 *        description: Bad request
 */

registerRoutes.post('/', registerController.register);

export default registerRoutes;
