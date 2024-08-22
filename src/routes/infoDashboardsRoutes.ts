import express from 'express';
import InfoDashboardsController from '../controllers/InfoDashboardsController.ts';

const infoDashboardsController = new InfoDashboardsController();

const infoDashboardsRoutes = express.Router();

infoDashboardsRoutes.get('/', infoDashboardsController.index);

export default infoDashboardsRoutes;
