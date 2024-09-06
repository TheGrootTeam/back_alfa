import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/IauthJWT';
import Company from '../models/Company';
import Applicant from '../models/Applicant';
import createError from 'http-errors';

export default class AuthController {
  async index(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.apiUserId;
      const company = await Company.findById(userId).lean();
      const isCompany = !!company;

      if (!isCompany) {
        const applicant = await Applicant.findById(userId).lean();
        if (applicant === null) {
          next(createError(404, 'userId in token not in InternIT database'));
          return;
        }
      }

      res.json({ isCompany });
    } catch (error) {
      next(error);
    }
  }
}
