import { Request, Response, NextFunction } from 'express';
import { offersList } from '../lib/offersUtils';
//import Offer from '../models/Offer';

export default class OffersController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const offers = await offersList(req);
      res.status(200).json({ offers: offers });
    } catch (error) {
      next(error);
    }
  }
}

//const offers = await Offer.find().populate('companyOwner', { name: 1 });
