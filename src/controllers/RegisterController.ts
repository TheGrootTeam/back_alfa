import Applicant from '../models/Applicant';
import Company from '../models/Company';
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';

export default class RegisterController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { dniCif, password, isCompany, email } = req.body;

      // Validate required fields
      if (!dniCif || !password || isCompany === undefined || !email) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      // Check if the applicant or company already exists
      const userExists = await Applicant.findOne({ email }) || await Company.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Password hash
      const hashedPassword = await hashPassword(password);

      // Minimal fields for new user creation
      const minimalFields = {
        dniCif,
        password: hashedPassword,
        email,
        name: 'Default Name',
        lastName: 'Default Last Name',
        phone: '0000000000',
        cv: 'default_cv_url',
        role: 'default_role',
        typeJob: 'default_typeJob',
        internType: 'default_internType',
        wantedRol: [],
        mainSkills: [],
        wantedJob: 'default_wantedJob',
        geographically_mobile: false,
        disponibility: false
      };

      const user = isCompany
        ? new Company({ ...minimalFields, sector: 'default_sector', ubication: 'default_ubication', description: 'default_description', logo: 'default_logo_url' })
        : new Applicant(minimalFields);

      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ message: 'Internal server error' });
      next(error);
    }
  }
}
