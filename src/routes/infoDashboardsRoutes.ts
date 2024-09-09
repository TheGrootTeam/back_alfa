import express from 'express';
import InfoDashboardsController from '../controllers/InfoDashboardsController';
import EditProfileController from '../controllers/EditProfileController';

const infoDashboardsController = new InfoDashboardsController();
const editProfileController = new EditProfileController();
const infoDashboardsRoutes = express.Router();

infoDashboardsRoutes.get('/:applicantOrCompany', infoDashboardsController.index);

infoDashboardsRoutes.patch('/:applicantOrCompany', editProfileController.patch);

export default infoDashboardsRoutes;
