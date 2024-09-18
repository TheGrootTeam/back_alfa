import express from 'express';
import InfoDashboardsController from '../controllers/InfoDashboardsController';
import EditProfileController from '../controllers/EditProfileController';
import uploadMiddleware from '../middlewares/uploadConfig';

const infoDashboardsController = new InfoDashboardsController();
const editProfileController = new EditProfileController();
const infoDashboardsRoutes = express.Router();

infoDashboardsRoutes.get('/:applicantOrCompany', infoDashboardsController.index);

infoDashboardsRoutes.patch('/:applicantOrCompany', uploadMiddleware, editProfileController.patch);

export default infoDashboardsRoutes;
