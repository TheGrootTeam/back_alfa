import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/IauthJWT';
import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Rol from '../models/Rol';
import Offer from '../models/Offer';
import Skill from '../models/Skill';
import Sector from '../models/Sector';

export default class InfoDashboardsController {
  async index(req: CustomRequest, res: Response, next: NextFunction) {
    const userId = req.apiUserId;
    const applicantOrCompany = req.params.applicantOrCompany;

    try {
      if (applicantOrCompany === 'applicant') {
        const applicantInfo = await Applicant.find({ _id: userId }, '-password').populate([
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
        const companyInfo = await Company.find({ _id: userId }, '-password').populate([
          {
            path: 'sector',
            model: Sector,
            select: 'sector'
          },
          {
            path: 'publishedOffers',
            model: Offer,
            select: 'position location status'
          }
        ]);

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

  // res.json({ companyId, applicantOrCompany });
}
