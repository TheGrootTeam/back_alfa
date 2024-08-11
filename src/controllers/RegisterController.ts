// src/controllers/RegisterController.ts
import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Sector from '../models/Sector'; // Import the Sector model
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';

// Function to get the ObjectId of the default sector
async function getDefaultSectorId() {
  let defaultSector = await Sector.findOne({ sector: 'Default Sector' });
  if (!defaultSector) {
    // If it doesn't exist, create a new one
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

      // Check if the applicant already exists
      const applicantExists = await Applicant.findOne({ email });
      if (applicantExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Check if the company already exists, only if the applicant doesn't exist
      const companyExists = await Company.findOne({ email });
      if (companyExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Password hash
      const hashedPassword = await hashPassword(password);

      // Create a new user in the appropriate collection with default values
      const defaultApplicantFields = {
        dniCif,
        password: hashedPassword,
        email,
        name: 'Default Name', // default name
        lastName: 'Default LastName', // default last name
        phone: '0000000000', // default phone
        photo: null, // default photo
        cv: 'default_cv_url', // default CV URL
        ubication: 'default_ubication', // default ubication
        typeJob: 'presencial', // default job type
        internType: 'renumerado', // default intern type
        wantedRol: [], // Empty list or default role IDs
        mainSkills: [], // Empty list or default skill IDs
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
        name: 'Default Name', // default name
        phone: '0000000000', // default phone
        sector: defaultSectorId, // valid ObjectId
        ubication: 'default_ubication', // default location
        description: 'default_description', // default description
        logo: 'default_logo_url' // default logo URL
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
