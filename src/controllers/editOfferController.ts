import Offer from '../models/Offer';
import { Request, Response, NextFunction } from 'express';

export default class EditOfferController {
  async patch(req: Request, res: Response, next: NextFunction) {

    try {
      const updatedOffer = req.body;
      //const { _id, position, description, status, numberVacancies, location, typeJob, internJob } = req.body;
      const { companyOwner, position, description, status, numberVacancies, location, typeJob, internJob } = updatedOffer;
      const _id: string = req.body.id;

      //Validate the updated fields 
      if (!_id || !position || !description || status === null || !numberVacancies || !location || !typeJob || !internJob) {
        res.status(400).json({ message: 'There are modified fields that are empty' });
        return;
      }

      const filterIdOffer = { _id };
      const updateDataOffer = {
        $set: {
          companyOwner,
          position,
          description,
          status,
          numberVacancies,
          location,
          typeJob,
          internJob
        }
      };
      const result = await Offer.updateOne(filterIdOffer, updateDataOffer);
      if (result.modifiedCount === 0) {
        res.status(404).json({ message: 'Offer not update' });
        return;
      }
      // Get the updated offer (using populate) and return it later in the response
      const updatedOfferData = await Offer.findById(_id)
        .populate('companyOwner', '_id name');

      if (!updatedOfferData) {
        res.status(404).json({ message: 'Offer not found after update' });
        return;
      }
      res.status(200).json(updatedOfferData);
    } catch (error) {
      console.log({ message: 'Internal server error updating the offer [editOfferController]' });
      next(error);
    }
  }
}
