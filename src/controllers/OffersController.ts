import { Request, Response, NextFunction } from 'express';
import Offer from '../models/Offer';

export default class OffersController {
  async index(_req: Request, res: Response, next: NextFunction) {
    try {
      const offersList = await Offer.find();
      res.status(200).json({ offers: offersList });
    } catch (error) {
      next(error);
    }
  }
}
