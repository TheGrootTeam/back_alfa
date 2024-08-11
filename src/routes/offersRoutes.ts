import express from 'express';
import OffersController from '../controllers/OffersController';
import CreateOfferController from '../controllers/CreateOfferController';

const offersController = new OffersController();
const createOfferController = new CreateOfferController();

const offersRoutes = express.Router();
offersRoutes.get('/', offersController.index);
offersRoutes.post('/new', createOfferController.post);

export default offersRoutes;
