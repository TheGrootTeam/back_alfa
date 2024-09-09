import Offer from '../models/Offer';
import { Request, Response, NextFunction } from 'express';
import Company from '../models/Company';

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
      let savedOffer = await newOffer.save();
      // Populate to obtain company´s name
      savedOffer = await savedOffer.populate('companyOwner', '_id name');

      //Update publishedOffers in database (Companies document) with the new offer's id
      const updateCompanyResult = await Company.updateOne(
        { _id: savedOffer.companyOwner._id },
        { $push: { publishedOffers: savedOffer._id } }
      );
      if (updateCompanyResult.modifiedCount < 1) {
        throw new Error('Error updating the new offer in the company');
      }

      // Return the saved offer
      return res.status(201).json(savedOffer);

    } catch (error) {
      console.log({ message: 'Internal server error [CreateOfferController]' });
      next(error);
    }

  }

}
