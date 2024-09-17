import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Sector from '../models/Sector';
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';
import mongoose from 'mongoose';
import createError from 'http-errors';
import { sendEmail } from '../services/emailService';
export default class RegisterController {
  async register(req: Request, res: Response, next: NextFunction) {
    async function getDefaultSectorId(sector: string) {
      const defaultSector = await Sector.findById(sector);
      return defaultSector;
    }

    try {
      const {
        dniCif,
        sector,
        password,
        isCompany,
        email,
        name,
        lastName,
        phone,
        ubication,
        typeJob,
        internType,
        wantedRol,
        mainSkills,
        geographically_mobile,
        disponibility, 
        description
      } = req.body;

      if (!dniCif || !password || (isCompany === 'true') === undefined || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if the email already exists in both Applicant and Company collections
      const existingEmail = (await Applicant.findOne({ email })) || (await Company.findOne({ email }));
      if (existingEmail) {
        return res.status(400).json({ message: 'Mail already exists' });
      }

      // Check if the dniCif already exists in both Applicant and Company collections
      const existingDniCif = (await Applicant.findOne({ dniCif })) || (await Company.findOne({ dniCif }));
      if (existingDniCif) {
        return res.status(400).json({ message: 'CIF/NIF already exists' });
      }

      const hashedPassword = await hashPassword(password);
      const defaultSectorId = (await getDefaultSectorId(sector)) === null ? '' : await getDefaultSectorId(sector);
      if ((isCompany === 'true') && !defaultSectorId) {
        next(createError(400, 'Sector not found'));
        return;
      }

      let user;

      if (isCompany === 'true') {
        let logoFile = req.body.logo;
        if (req.files && typeof req.files === 'object' && 'logo' in req.files) {
          logoFile = (req.files['logo'] as Express.Multer.File[])[0].filename;
        }
        user = new Company({
          dniCif,
          password: hashedPassword,
          email,
          name: name || 'Default Name',
          phone: phone || '0000000000',
          sector: defaultSectorId,
          ubication: ubication || 'default_ubication',
          description: description || 'default_description',
          logo: logoFile
        });
      } else {
        let cvFile = req.body.cv;
        let photoFile = req.body.photo;
        if (req.files && typeof req.files === 'object' && 'cv' in req.files) {
          cvFile = (req.files['cv'] as Express.Multer.File[])[0].filename;
        }
        if (req.files && typeof req.files === 'object' && 'photo' in req.files) {
          photoFile = (req.files['photo'] as Express.Multer.File[])[0].filename;
        }

        user = new Applicant({
          dniCif,
          password: hashedPassword,
          email,
          name: name || 'Default Name',
          lastName: lastName || 'Default LastName',
          phone: phone || '0000000000',
          photo: photoFile,
          cv: cvFile,
          ubication: ubication || 'default_ubication',
          typeJob: typeJob || 'presencial',
          internType: internType || 'remunerado',
          wantedRol: wantedRol
            ? wantedRol
                .map((rol: string) => (mongoose.Types.ObjectId.isValid(rol) ? new mongoose.Types.ObjectId(rol) : null))
                .filter((id: mongoose.Types.ObjectId | null): id is mongoose.Types.ObjectId => id !== null)
            : [],
          mainSkills: mainSkills
            ? mainSkills
                .map((skill: string) =>
                  mongoose.Types.ObjectId.isValid(skill) ? new mongoose.Types.ObjectId(skill) : null
                )
                .filter((id: mongoose.Types.ObjectId | null): id is mongoose.Types.ObjectId => id !== null)
            : [],
          geographically_mobile: (geographically_mobile === 'true') || false,
          disponibility: (disponibility === 'true') || false
        });
      }

      await user.save();
      //Send the welcome email according to the user type
      const subject = (isCompany === 'true') ? `¡Bienvenido a InternIT, ${name}!` : `¡Bienvenido a InternIT, ${name}!`;

      const message = (isCompany === 'true')
        ? `
          <h1>¡Hola, ${name}!😃🤚🏻</h1>
          <p>Estamos muy emocionados de tenerte a bordo como parte de nuestra red de empresas en InternIT.</p>
          <p>Ahora puedes publicar ofertas de trabajo y encontrar el mejor talento para tu empresa.</p>
          <p>Si tienes alguna duda, no dudes en contactar con nosotros. ¡Estamos aquí para ayudarte a tener éxito!</p>
          <p>Atentamente,<br/>El equipo de a href="https://internit.tech">InternIT</a></p>
        `
        : `
          <h1>¡Hola, ${name}! 😃🤚🏻</h1>
          <p>Gracias por unirte a InternIT. Estamos aquí para ayudarte a encontrar el trabajo de tus sueños.</p>
          <p>Puedes empezar a crear tu perfil, buscar ofertas de trabajo y contactar a las empresas que más te interesen.</p>
          <p>Si necesitas asistencia, estamos a tu disposición. ¡Te deseamos mucho éxito en tu búsqueda!</p>
          <p>Atentamente,<br/>El equipo de <a href="https://internit.tech">InternIT</a></p>
        `;

      await sendEmail(email, subject, message, '');

      return res.status(201).json({ message: 'User registered successfully, and welcome email sent' });
    } catch (error) {
      console.error('Error in register:', error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
