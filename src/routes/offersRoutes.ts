import express from 'express';
import OffersController from '../controllers/OffersController';
import CreateOfferController from '../controllers/CreateOfferController';
import EditOfferController from '../controllers/editOfferController';

const offersController = new OffersController();
const createOfferController = new CreateOfferController();
const editOfferController = new EditOfferController();

const offersRoutes = express.Router();
offersRoutes.get('/', offersController.index);
offersRoutes.post('/new', createOfferController.post);
offersRoutes.patch('/edit', editOfferController.patch);

export default offersRoutes;
