import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/IauthJWT';
import Applicant from '../models/Applicant';
import Company from '../models/Company';

export default class EditProfileController {
  //   // Method for updating the profile
  async patch(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.apiUserId;
      const applicantOrCompany = req.params.applicantOrCompany;
      const data = req.body;
      if (data.id !== userId) {
        return res.status(403).json({ message: 'You are not authorized to edit this offer' });
      }

      if (applicantOrCompany === 'applicant') {
        const result = await Applicant.updateOne({ _id: userId }, data);
        if (result.modifiedCount === 0) {
          res.status(404).json({ message: 'Offer not update' });
          return;
        }
      } else if (applicantOrCompany === 'company') {
        const result = await Company.updateOne({ _id: userId }, data);
        if (result.modifiedCount === 0) {
          res.status(404).json({ message: 'Offer not update' });
          return;
        } else {
          res.status(404).json({ error: 'Invalid query parameter' });
        }
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
