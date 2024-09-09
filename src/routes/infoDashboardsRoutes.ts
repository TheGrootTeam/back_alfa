import express from 'express';
import InfoDashboardsController from '../controllers/InfoDashboardsController.ts';
import EditProfileController from '../controllers/EditProfileController.js';

const infoDashboardsController = new InfoDashboardsController();
const editProfileController = new EditProfileController();
const infoDashboardsRoutes = express.Router();

infoDashboardsRoutes.get('/:applicantOrCompany', infoDashboardsController.index);

infoDashboardsRoutes.patch('/:applicantOrCompany', editProfileController.patch);


export default infoDashboardsRoutes;
