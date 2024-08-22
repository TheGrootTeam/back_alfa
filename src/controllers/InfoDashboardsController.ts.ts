import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/IauthJWT';
import Applicant from '../models/Applicant';
import Company from '../models/Company';

export default class InfoDashboardsController {
  async index(req: CustomRequest, res: Response, next: NextFunction) {
    const userId = req.apiUserId;
    const applicantOrCompany = req.params.applicantOrCompany;

    try {
      if (applicantOrCompany === 'applicant') {
        const applicantInfo = await Applicant.find({ _id: userId }, '-password');
        if (applicantInfo.length === 0) {
          res.status(404).json({ error: 'Resource not found' });
          return;
        }
        res.status(200).json({ applicantInfo });
      } else if (applicantOrCompany === 'company') {
        const companyInfo = await Company.find({ _id: userId }, '-password');
        if (companyInfo.length === 0) {
          res.status(404).json({ error: 'Resource not found' });
          return;
        }
        res.status(200).json({ companyInfo });
      }
    } catch (error) {
      next(error);
    }
  }

  // res.json({ companyId, applicantOrCompany });
}
