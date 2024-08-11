// src/controllers/RegisterController.ts
import Applicant from '../models/Applicant';
import Company from '../models/Company';
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';
import mongoose from 'mongoose'; // Importa mongoose para crear ObjectId

export default class RegisterController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { dniCif, password, isCompany, email } = req.body;

      // Validate Fields
      if (!dniCif || !password || isCompany === undefined || !email) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      // Check if the applicant already exists
      const applicantExists = await Applicant.findOne({ email });
      if (applicantExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Check if the company already exists only if the applicant doesn't
      const companyExists = await Company.findOne({ email });
      if (companyExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Password hash
      const hashedPassword = await hashPassword(password);

      // Create new user in the appropriate collection with default values
      const defaultApplicantFields = {
        dniCif,
        password: hashedPassword,
        email,
        name: 'Default Name', // default name
        phone: '0000000000', // default phone
        cv: 'default_cv_url', // default cv url
        role: 'default_role', // default role
        typeJob: 'default_typeJob', // default type job
        wantedJob: 'default_wantedJob', // default wanted job
        geographically_mobile: false,
        disponibility: false
      };

      // Replace 'default_sector_id' with a valid ObjectId from your database or make this field optional initially.
      const defaultSectorId = new mongoose.Types.ObjectId('60d9f2f8f8d9c9a2f8d9f2f8'); // Example ObjectId, replace with a real one
      const defaultCompanyFields = {
        dniCif,
        password: hashedPassword,
        email,
        name: 'Default Name', // default name
        phone: '0000000000', // default phone
        sector: defaultSectorId, // A valid ObjectId
        ubication: 'default_ubication', // default ubication
        description: 'default_description', // default description
        logo: 'default_logo_url' // default logo url
      };

      const user = isCompany
        ? new Company(defaultCompanyFields)
        : new Applicant(defaultApplicantFields);

      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ message: 'Internal server error' });
      next(error);
    }
  }
}
