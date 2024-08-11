import Offer from '../models/Offer';
import { Request, Response, NextFunction } from 'express';

export default class CreateOfferController {
  async post(req: Request, res: Response, next: NextFunction) {

    try {
      const newOffer = req.body;
      const { position, publicationDate, description, companyOwner, status, numberVacancies } = req.body;

      //Validate the fields
      if (!position || !publicationDate || !description || !companyOwner || !status || !numberVacancies) {
        res.status(400).json({ message: 'There are fields required that there arent presents' });
        return;
      }

      await Offer.insertMany(newOffer);
      res.status(201).json({ message: 'Offer registered successfully' });

    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
      next(error);
    }

  }

}
