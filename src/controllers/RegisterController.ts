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

      // Additional validation can be added here (e.g., validate email format)

      // Check if the user already exists in either Applicant or Company
      const existingUser = await Applicant.findOne({ email }) || await Company.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Password hash
      const hashedPassword = await hashPassword(password);

      // Create a new user in the appropriate collection with default values
      const defaultApplicantFields = {
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
        suscribedOffers: []
      };

      const defaultSectorId = await getDefaultSectorId();

      const defaultCompanyFields = {
        dniCif,
        password: hashedPassword,
        email,
        name: 'Default Name',
        phone: '0000000000',
        sector: defaultSectorId,
        ubication: 'default_ubication',
        description: 'default_description',
        logo: 'default_logo_url'
      };

      const user = isCompany
        ? new Company(defaultCompanyFields)
        : new Applicant(defaultApplicantFields);

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
