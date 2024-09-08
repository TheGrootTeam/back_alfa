import express from 'express';
import DeleteProfileController from '../controllers/DeleteProfileController';
import authJWT from '../middlewares/authJWT';

const deleteProfileController = new DeleteProfileController();
const deleteProfileRoutes = express.Router();

// Ruta para eliminar el perfil autenticado
deleteProfileRoutes.delete('/', authJWT, deleteProfileController.deleteProfile);

export default deleteProfileRoutes;
