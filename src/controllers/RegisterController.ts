import jwt from 'jsonwebtoken';
import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Sector from '../models/Sector'; // Import the Sector model
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';

// Function to get the ObjectId of the default sector
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

      // Validate required fields
      if (!dniCif || !password || isCompany === undefined || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if the user already exists
      const existingUser = await Applicant.findOne({ email }) || await Company.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Password hash
      const hashedPassword = await hashPassword(password);

      const defaultSectorId = await getDefaultSectorId();

      // Create a new user in the appropriate collection with default values
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

      // Generate JWT
      const token = jwt.sign({ userId: user._id, isCompany }, process.env.JWT_SECRET as string, {
        expiresIn: '2h',
      });

      return res.status(201).json({ message: 'User registered successfully', token, isCompany });
    } catch (error) {
      console.error('Error in register:', error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
