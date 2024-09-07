import { Response, NextFunction } from 'express';
import createError from 'http-errors';
import Company from '../models/Company';
import { CustomRequest } from '../interfaces/IauthJWT';
import Applicant from '../models/Applicant';
import { comparePassword, hashPassword } from '../lib/utils';

export default class PasswordController {
  async change(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.apiUserId;
      const { currentPassword, newPassword, confirmNewPassword, isCompany } = req.body;

      // verify if new and confirm passwords are the same
      if (newPassword.trim() !== confirmNewPassword.trim()) {
        next(createError(400, "The new and confirm password aren't the same"));
        return;
      }

      if (isCompany) {
        const response = await Company.findById(userId).select('password');
        // create error if user not in Company
        if (!response) {
          next(createError(400, 'UserId or isCompany not correct'));
          return;
        }

        const password = response.password;

        // compare current password
        const comparedPassword = await comparePassword(currentPassword, password);

        if (!comparedPassword) {
          next(createError(400, 'Current password not correct'));
          return;
        }

        // hash passwords
        const hashedNewPassword = await hashPassword(newPassword);

        await Company.findByIdAndUpdate(userId, { password: hashedNewPassword });
        res.status(200).json({ message: 'Password changed successfully' });
      } else {
        const response = await Applicant.findById(userId).select('password');
        // create error if user not in Company
        if (!response) {
          next(createError(400, 'UserId or isCompany not correct'));
          return;
        }

        const password = response.password;

        // compare current password
        const comparedPassword = await comparePassword(currentPassword, password);

        if (!comparedPassword) {
          next(createError(400, 'Current password not correct'));
          return;
        }

        // hash passwords
        const hashedNewPassword = await hashPassword(newPassword);

        await Applicant.findByIdAndUpdate(userId, { password: hashedNewPassword });
        res.status(200).json({ message: 'Password changed successfully' });
      }
    } catch (error) {
      next(error);
    }
  }
}
