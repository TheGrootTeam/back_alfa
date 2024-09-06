import Offer from '../models/Offer';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/IauthJWT';

export default class EditOfferController {
  //CustomRequest extends Request
  async patch(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const updatedOffer = req.body;
      const { companyOwner, position, description, status, numberVacancies, location, typeJob, internJob } = updatedOffer;
      const _id: string = req.body.id;

      //Validate the updated fields 
      if (!_id || !position || !description || status === null || !numberVacancies || !location || !typeJob || !internJob) {
        res.status(400).json({ message: 'There are modified fields that are empty' });
        return;
      }

      //Check the existance of the offer and the user is owner of the offer
      const offer = await Offer.findById(_id);
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      if (companyOwner._id !== req.apiUserId) {
        return res.status(403).json({ message: 'You are not authorized to edit this offer' });
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
