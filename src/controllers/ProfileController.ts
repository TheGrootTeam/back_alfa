import { Response, NextFunction } from 'express';
import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Rol from '../models/Rol';
import Skill from '../models/Skill';
import { ParamsProfileController } from '../interfaces/IParams';

export default class ProfileController {
  async index(req: ParamsProfileController, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const applicantOrCompany = req.params.applicantOrCompany;

    try {
      if (applicantOrCompany === 'applicant') {
        const applicantInfo = await Applicant.find(
          { _id: userId },
          '-password -dniCif -geographically_mobile -preferredOffers -suscribedOffers'
        ).populate([
          {
            path: 'wantedRol',
            model: Rol,
            select: 'rol'
          },
          { path: 'mainSkills', model: Skill, select: 'skill' }
        ]);
        if (applicantInfo.length === 0) {
          res.status(404).json({ error: 'Resource not found' });
          return;
        }
        res.status(200).json({ applicantInfo });
      } else if (applicantOrCompany === 'company') {
        const companyInfo = await Company.find({ _id: userId }, '-password -dniCif');
        if (companyInfo.length === 0) {
          res.status(404).json({ error: 'Resource not found' });
          return;
        }
        res.status(200).json({ companyInfo });
      } else {
        res.status(404).json({ error: 'Invalid query parameter' });
      }
    } catch (error) {
      next(error);
    }
  }
}
