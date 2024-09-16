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

      let data = req.body;
      if (data.id !== userId) {
        return res.status(403).json({ message: 'You are not authorized to edit this offer' });
      }

      if (applicantOrCompany === 'applicant') {
        // Import file name from req.files
        let cvFile = req.body.cv;
        let photoFile = req.body.photo;
        if (req.files && typeof req.files === 'object' && 'cv' in req.files) {
          cvFile = (req.files['cv'] as Express.Multer.File[])[0].filename;
        }
        if (req.files && typeof req.files === 'object' && 'photo' in req.files) {
          photoFile = (req.files['photo'] as Express.Multer.File[])[0].filename;
        }

        //Add new files name to data
        // eslint-disable-next-line prefer-const
        let { cv, photo, ...rest } = req.body;
        cv = cvFile;
        photo = photoFile;
        data = { cv, photo, ...rest };
        const result = await Applicant.updateOne({ _id: userId }, data);
        if (result.modifiedCount === 0) {
          res.status(404).json({ message: 'Info not update' });
          return;
        }
      } else if (applicantOrCompany === 'company') {
        // Import file name from req.files
        let logoFile = req.body.logo;
        if (req.files && typeof req.files === 'object' && 'logo' in req.files) {
          logoFile = (req.files['logo'] as Express.Multer.File[])[0].filename;
        }

        //Add new files name to data
        // eslint-disable-next-line prefer-const
        let { logo, ...rest } = req.body;
        logo = logoFile;
        data = { logo, ...rest };
        const result = await Company.updateOne({ _id: userId }, data);
        if (result.modifiedCount === 0) {
          console.log('entro 48');
          res.status(404).json({ message: 'Info not update' });
          return;
        }
      } else {
        res.status(404).json({ error: 'Invalid query parameter' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
