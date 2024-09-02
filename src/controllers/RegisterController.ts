import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Sector from '../models/Sector';
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';
import mongoose from 'mongoose';

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
      const { dniCif, password, isCompany, email, name, lastName, phone, cv, ubication, typeJob, internType, wantedRol, mainSkills, geographically_mobile, disponibility, description, logo } = req.body;

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
            name: name || 'Default Name',
            phone: phone || '0000000000',
            sector: defaultSectorId,
            ubication: ubication || 'default_ubication',
            description: description || 'default_description',
            logo: logo || 'default_logo_url'
          })
        : new Applicant({
            dniCif,
            password: hashedPassword,
            email,
            name: name || 'Default Name',
            lastName: lastName || 'Default LastName',
            phone: phone || '0000000000',
            photo: null,
            cv: cv || 'default_cv_url',
            ubication: ubication || 'default_ubication',
            typeJob: typeJob || 'presencial',
            internType: internType || 'renumerado',
            wantedRol: wantedRol ? wantedRol.map((rol: string) => mongoose.Types.ObjectId.isValid(rol) ? new mongoose.Types.ObjectId(rol) : null).filter((id: mongoose.Types.ObjectId | null): id is mongoose.Types.ObjectId => id !== null) : [],
            mainSkills: mainSkills ? mainSkills.map((skill: string) => mongoose.Types.ObjectId.isValid(skill) ? new mongoose.Types.ObjectId(skill) : null).filter((id: mongoose.Types.ObjectId | null): id is mongoose.Types.ObjectId => id !== null) : [],
            geographically_mobile: geographically_mobile || false,
            disponibility: disponibility || false,
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
