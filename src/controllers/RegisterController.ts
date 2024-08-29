import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Sector from '../models/Sector';
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';

async function getDefaultSectorId() {
  let defaultSector = await Sector.findOne({ sector: 'Default Sector' });
  if (!defaultSector) {
    defaultSector = new Sector({ sector: 'Default Sector' });
    await defaultSector.save();
  }
  return defaultSector._id;
}

export default class RegisterController {
  async register(req: Request, res: Response, _next: NextFunction) {
    try {
      const { dniCif, password, isCompany, email } = req.body;

      if (!dniCif || !password || isCompany === undefined || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if the email already exists in both Applicant and Company collections
      const existingEmail = await Applicant.findOne({ email }) || await Company.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Check if the dniCif already exists in both Applicant and Company collections
      const existingDniCif = await Applicant.findOne({ dniCif }) || await Company.findOne({ dniCif });
      if (existingDniCif) {
        return res.status(400).json({ message: 'CIF/NIF already exists' });
      }

      const hashedPassword = await hashPassword(password);
      const defaultSectorId = await getDefaultSectorId();

      const user = isCompany
        ? new Company({
            dniCif,
            password: hashedPassword,
            email,
            name: 'Default Name',
            phone: '0000000000',
            sector: defaultSectorId,
            ubication: 'default_ubication',
            description: 'default_description',
            logo: 'default_logo_url',
          })
        : new Applicant({
            dniCif,
            password: hashedPassword,
            email,
            name: 'Default Name',
            lastName: 'Default LastName',
            phone: '0000000000',
            photo: null,
            cv: 'default_cv_url',
            ubication: 'default_ubication',
            typeJob: 'presencial',
            internType: 'renumerado',
            wantedRol: [],
            mainSkills: [],
            geographically_mobile: false,
            disponibility: false,
            preferredOffers: [],
            suscribedOffers: [],
          });

      await user.save();

      return res.status(201).json({ message: 'User registered successfully' });
      
    } catch (error) {
      console.error('Error in register:', error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}