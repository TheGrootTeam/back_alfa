import Applicant from '../models/Applicant';
import Company from '../models/Company';
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';

export default class RegisterController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { dniCif, password, isCompany, email } = req.body;

      // validateFields
      if (!dniCif || !password || isCompany === undefined || !email) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      // Verify if the user already exists in either collection
      const applicantExists = await Applicant.findOne({ email });
      const companyExists = await Company.findOne({ email });

      if (applicantExists || companyExists) {
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

      const defaultCompanyFields = {
        dniCif,
        password: hashedPassword,
        email,
        name: 'Default Name', // default name
        phone: '0000000000', // default phone
        sector: 'default_sector', // default sector
        ubication: 'default_ubication', // default ubication
        description: 'default_description' // default description
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
