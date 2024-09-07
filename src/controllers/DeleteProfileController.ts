import { Response, NextFunction } from 'express';
import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Offer from '../models/Offer';
import { CustomRequest } from '../interfaces/IauthJWT';
import createError from 'http-errors';

export default class DeleteProfileController {
  // Delete the authenticated user profile
  async deleteProfile(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.apiUserId;

      // We try to find the company's profile or the applicant
      const company = await Company.findById(userId);
      const applicant = await Applicant.findById(userId);

      if (!company && !applicant) {
        return next(createError(404, 'User not found'));
      }

      if (company) {
        // Delete offers associated with the company
        await Offer.deleteMany({ companyOwner: company._id });

        // Delete the company profile
        await Company.findByIdAndDelete(company._id);
      } else if (applicant) {
        // Delete subscriptions from the applicant
        await Applicant.updateMany(
          { _id: applicant._id },
          { $pull: { suscribedOffers: { $in: applicant.suscribedOffers } } }
        );

        // Delete the applicant's profile
        await Applicant.findByIdAndDelete(applicant._id);
      }

      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting profile:', error);
      return next(createError(500, 'Internal server error'));
    }
  }
}
