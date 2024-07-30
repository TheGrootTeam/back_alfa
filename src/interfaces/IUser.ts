// Código original de Ivette
import { Document } from 'mongoose';
import { Model } from 'mongoose';
export interface IUser extends Document {
  userId: string;
  dniCif: string;
  password: string;
  isCompany: boolean;
  email: string;
  comparePassword(password: string): Promise<boolean>;
}
export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<string>;
}




// import { Document, Types } from 'mongoose';

// // (Company and Applicant combined in Iuser interfce)
// export interface IUser extends Document{
//   dniCif: string;
//   password: string; // Aplicar hash
//   name: string;
//   email: string;
//   phone: string;
//   photo?: string; // URL a imagen (Applicant)
//   cv?: string; // URL a documento (Applicant)
//   ubication: string;
//   role?: 'presencial' | 'teletrabajo' | 'hibrido'; // (Applicant)
//   typeJob?: 'renumerado' | 'no renumerado' | 'voluntariado'; //  (Applicant)
//   wantedJob?: string; // (Applicant)
//   geographically_mobile?: boolean; // (Applicant)
//   disponibility?: boolean; // (Applicant)
//   // preferredOffers?: string[]; // Array de IDs de Offer (Applicant)
//   // suscribedOffers?: string[]; // Array de IDs de Offer (Applicant)
//   preferredOffers?: Types.ObjectId[]; // Array de IDs de Offer (Applicant)
//   suscribedOffers?: Types.ObjectId[]; // Array de IDs de Offer (Applicant)
//   sector?: string; // (Company)
//   description?: string; // (Company)
//   //publishedOffers?: string[]; // Array de IDs de Offer (Company)
//   publishedOffers?: Types.ObjectId[]; // Array de IDs de Offer (Company)
// }
