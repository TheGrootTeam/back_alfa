import Offer from '../models/Offer';
import { Request, Response, NextFunction } from 'express';

export default class EditOfferController {
  async put(req: Request, res: Response, next: NextFunction) {

    try {
      const updatedOffer = req.body;
      //const { _id, position, description, status, numberVacancies, location, typeJob, internJob } = req.body;
      const { _id, position, description, status, numberVacancies, location, typeJob, internJob } = updatedOffer;

      //Validate the updated fields 
      if (!_id || !position || !description || status === null || !numberVacancies || !location || !typeJob || !internJob) {
        res.status(400).json({ message: 'There are modified fields that are empty' });
        return;
      }

      const filterIdOffer = { _id };
      const updateDataOffer = {
        $set: {
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
      res.status(200).json({ message: 'Offer update succesfully' });

    } catch (error) {
      res.status(500).json({ message: 'Internal server error updating the offer' });
      next(error);
    }
  }
}
