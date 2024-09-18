import { Response, NextFunction } from 'express';
import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Offer from '../models/Offer';
import { CustomRequest } from '../interfaces/IauthJWT';
import createError from 'http-errors';
import { sendEmail } from '../services/emailService'; // Importa la función de envío de email

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

      let userEmail = '';
      let userName = '';

      if (company) {
        userEmail = company.email;
        userName = company.name;

        // Delete offers associated with the company
        await Offer.deleteMany({ companyOwner: company._id });

        // Delete the company profile
        await Company.findByIdAndDelete(company._id);
      } else if (applicant) {
        userEmail = applicant.email;
        userName = applicant.name;

        // Delete subscriptions from the applicant
        await Applicant.updateMany(
          { _id: applicant._id },
          { $pull: { suscribedOffers: { $in: applicant.suscribedOffers } } }
        );

        // Delete the applicant's profile
        await Applicant.findByIdAndDelete(applicant._id);
      }

      // Enviar un correo electrónico de confirmación de la baja
      const subject = 'Confirmación de baja de InternIT';
      const message = `
        <h1>Adiós, ${userName} 😢🤚🏻</h1>
        <p>Lamentamos que hayas decidido darte de baja en InternIT.</p>
        <p>Si cambias de opinión, siempre serás bienvenido/a de nuevo.</p>
        <p>Gracias por haber sido parte de nuestra comunidad.</p>
        <p>Atentamente,<br/>El equipo de <a href="https://internIT.tech">InternIT</a></p>
      `;

      // Enviar el correo electrónico de confirmación con un replyTo vacío o predeterminado
      await sendEmail(userEmail, subject, message, '');

      res.status(200).json({ message: 'Profile deleted successfully, and email sent' });
    } catch (error) {
      console.error('Error deleting profile:', error);
      return next(createError(500, 'Internal server error'));
    }
  }
}
