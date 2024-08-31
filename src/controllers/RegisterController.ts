import Applicant from '../models/Applicant';
import Company from '../models/Company';
import Sector from '../models/Sector';
import { Request, Response, NextFunction } from 'express';
import { hashPassword } from '../lib/utils';
import mongoose, { Types } from 'mongoose';
import { IApplicant, IApplicantEx } from '../interfaces/IApplicant';
import { ICompany, ICompanyEx } from '../interfaces/ICompany';

async function getDefaultSectorId(): Promise<Types.ObjectId> {
  let defaultSector = await Sector.findOne({ sector: 'Default Sector' });
  if (!defaultSector) {
    defaultSector = new Sector({ sector: 'Default Sector' });
    await defaultSector.save();
  }
  return defaultSector._id;
}

async function validateUserData(dniCif: string) {
  const existingDniCif = await Applicant.findOne({ dniCif }) || await Company.findOne({ dniCif });
  if (existingDniCif) {
    throw new Error('CIF/NIF already exists');
  }
}

async function createApplicant(data: IApplicantEx): Promise<IApplicant> {
  const hashedPassword = await hashPassword(data.password);
  
  const validWantedRol = data.wantedRol.filter(rol => mongoose.Types.ObjectId.isValid(rol)).map(rol => new mongoose.Types.ObjectId(rol));
  const validMainSkills = data.mainSkills.filter(skill => mongoose.Types.ObjectId.isValid(skill)).map(skill => new mongoose.Types.ObjectId(skill));

  const applicant = new Applicant({
    ...data,
    password: hashedPassword,
    wantedRol: validWantedRol,
    mainSkills: validMainSkills,
  });

  await applicant.save();
  return applicant.toObject() as IApplicant;
}

async function createCompany(data: ICompanyEx): Promise<ICompany> {
  const hashedPassword = await hashPassword(data.password);
  const company = new Company({
    ...data,
    password: hashedPassword,
    sector: new mongoose.Types.ObjectId(data.sector),
  });
  await company.save();
  return company.toObject() as ICompany;
}

export default class RegisterController {
  async register(req: Request, res: Response, _next: NextFunction) {
    try {
      const { isCompany, ...userData } = req.body;

      if (!userData.dniCif || !userData.password || isCompany === undefined || !userData.email) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Validar el dniCif para evitar duplicados
      await validateUserData(userData.dniCif);

      if (isCompany) {
        const companyData: ICompanyEx = {
          ...userData,
          sector: await getDefaultSectorId(),
          name: userData.name || 'Default Company Name',
          phone: userData.phone || '0000000000',
          ubication: userData.ubication || 'default_ubication',
          description: userData.description || 'default_description',
          logo: userData.logo || 'default_logo_url',
        };
        await createCompany(companyData);
      } else {
        const applicantData: IApplicantEx = {
          ...userData,
          name: userData.name || 'Default Name',
          lastName: userData.lastName || 'Default LastName',
          phone: userData.phone || '0000000000',
          photo: userData.photo,
          cv: userData.cv || 'default_cv_url',
          ubication: userData.ubication || 'default_ubication',
          role: userData.role || 'default_role',
          typeJob: userData.typeJob || 'presencial',
          internType: userData.internType || 'renumerado',
          wantedRol: userData.wantedRol || [],
          mainSkills: userData.mainSkills || [],
          geographically_mobile: userData.geographically_mobile || false,
          disponibility: userData.disponibility || false,
        };
        await createApplicant(applicantData);
      }

      return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
      console.error('Error in register:', error as Error);
      const err = error as Error;
      if (err.message === 'CIF/NIF already exists') {
        return res.status(400).json({ message: err.message });
      }
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
