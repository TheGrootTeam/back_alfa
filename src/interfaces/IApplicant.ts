import { Document, Types } from 'mongoose';

export interface IApplicant extends Document {
  dniCif: string;
  password: string;
  name: string;
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
  wantedJob: string;
  geographically_mobile: boolean;
  disponibility: boolean;
  preferredOffers?: Types.ObjectId[]; // Array of Offer IDs
  suscribedOffers?: Types.ObjectId[]; // Array of Offer IDs
}
