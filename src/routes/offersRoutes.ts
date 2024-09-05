import express from 'express';
import OffersController from '../controllers/OffersController';
import CreateOfferController from '../controllers/CreateOfferController';
import EditOfferController from '../controllers/editOfferController';
import authJWT from '../middlewares/authJWT';

const offersController = new OffersController();
const createOfferController = new CreateOfferController();
const editOfferController = new EditOfferController();

const offersRoutes = express.Router();
offersRoutes.get('/', offersController.index);
offersRoutes.post('/new', authJWT, createOfferController.post);
offersRoutes.patch('/edit', authJWT, editOfferController.patch);
offersRoutes.post('/delete', authJWT, offersController.delete);

export default offersRoutes;
