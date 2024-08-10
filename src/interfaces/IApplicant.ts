import { Document, Types } from 'mongoose';

export interface IApplicant extends Document {
  dniCif: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  photo?: string; // URL to image
  cv: string; // URL to document
  ubication?: string | null;
  // problems with the compatibility of types of mongoose
  //role: ('presencial' | 'teletrabajo' | 'hibrido');
  role: string;
  // problems with the compatibility of types of mongoose
  //typeJob: 'renumerado' | 'no renumerado' | 'voluntariado';
  typeJob: string;
  internType: string;
  wantedRol: Types.ObjectId[];
  mainSkills: Types.ObjectId[];
  geographically_mobile: boolean;
  disponibility: boolean;
  preferredOffers?: Types.ObjectId[]; // Array of Offer IDs
  suscribedOffers?: Types.ObjectId[]; // Array of Offer IDs
}

// to use in initDB
export interface IApplicantEx {
  dniCif: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  photo?: string; // URL to image
  cv: string; // URL to document
  ubication?: string | null;
  // problems with the compatibility of types of mongoose
  // problems with the compatibility of types of mongoose
  //typeJob: 'renumerado' | 'no renumerado' | 'voluntariado';
  typeJob: string;
  //internType: ('presencial' | 'teletrabajo' | 'hibrido');
  internType: string;
  wantedRol: Types.ObjectId[] | string[];
  mainSkills: Types.ObjectId[] | string[];
  geographically_mobile: boolean;
  disponibility: boolean;
  preferredOffers?: Types.ObjectId[]; // Array of Offer IDs
  suscribedOffers?: Types.ObjectId[]; // Array of Offer IDs
}
