import { Response, NextFunction } from 'express';
import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Offer from '../models/Offer';
import { CustomRequest } from '../interfaces/IauthJWT';
import createError from 'http-errors';

export default class DeleteProfileController {
  // Eliminar el perfil del usuario autenticado
  async deleteProfile(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.apiUserId;

      // Intentamos encontrar el perfil de la compañía o el solicitante
      const company = await Company.findById(userId);
      const applicant = await Applicant.findById(userId);

      if (!company && !applicant) {
        return next(createError(404, 'User not found'));
      }

      if (company) {
        // Eliminar ofertas asociadas a la empresa
        await Offer.deleteMany({ company: company._id });

        // Eliminar el perfil de la compañía
        await Company.findByIdAndDelete(company._id);
      } else if (applicant) {
        // Eliminar suscripciones del solicitante
        await Applicant.updateMany(
          { _id: applicant._id },
          { $pull: { suscribedOffers: { $in: applicant.suscribedOffers } } }
        );

        // Eliminar el perfil del solicitante
        await Applicant.findByIdAndDelete(applicant._id);
      }

      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting profile:', error);
      return next(createError(500, 'Internal server error'));
    }
  }
}
