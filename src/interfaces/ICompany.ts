import { Document, Types } from 'mongoose';

export interface ICompany extends Document {
  dniCif: string;
  password: string; // Apply hash
  name: string;
  email: string;
  phone: string;
  sector: Types.ObjectId;
  ubication: string;
  description: string;
  logo: string;
  publishedOffers?: Types.ObjectId[];
}

// to use in initDB
export interface ICompanyEx {
  dniCif: string;
  password: string; // Apply hash
  name: string;
  email: string;
  phone: string;
  sector: Types.ObjectId | string;
  ubication: string;
  description: string;
  logo: string;
  publishedOffers?: Types.ObjectId[];
}
