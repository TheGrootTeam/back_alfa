import Offer from '../models/Offer';
import { Request, Response, NextFunction } from 'express';

export default class CreateOfferController {
  async post(req: Request, res: Response, next: NextFunction) {

    try {
      //const newOffer = req.body;
      const { position, publicationDate, description, companyOwner, status, numberVacancies, location, typeJob, internJob } = req.body;

      //Validate the fields
      if (!
        position || !publicationDate || !description || !companyOwner || !status
        || !numberVacancies || !location || !typeJob || !internJob
      ) {
        res.status(400).json({ message: 'There are fields required that there arent presents' });
        return;
      }

      // Create a new offer document
      const newOffer = new Offer({
        position,
        publicationDate,
        description,
        companyOwner,
        status,
        numberVacancies,
        location,
        typeJob,
        internJob
      });

      // Save the new offer to the database
      const savedOffer = await newOffer.save();
      // Return the saved offer
      return res.status(201).json(savedOffer);

    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
      next(error);
    }

  }

}
