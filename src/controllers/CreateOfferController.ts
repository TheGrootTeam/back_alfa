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

      //BALIZA
      console.log('NEW OFFER:', newOffer);

      // Save the new offer to the database
      let savedOffer = await newOffer.save();
      //BALIZA
      // Populate to obtain company´s name
      savedOffer = await savedOffer.populate('companyOwner', '_id name');


      //BALIZA
      console.log('SAVED OFFER:', savedOffer);

      //BALIZA
      // Return the saved offer
      return res.status(201).json(savedOffer);

    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
      next(error);
    }

  }

}
