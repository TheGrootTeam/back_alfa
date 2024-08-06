import { Document, Types } from 'mongoose';

export interface IOffer extends Document {
  position: string;
  publicationDate: Date;
  description: string;
  companyOwner: Types.ObjectId;
  status: boolean;
  numberVacancies: number;
  listApplicants?: Types.ObjectId[];
  numberApplicants: number;
}

// ---------------------- TEST --------------------
export interface IOfferTest {
  position: string;
  publicationDate: string;
  description: string;
  companyOwner: string;
  status: boolean;
  numberVacancies: number;
  listApplicants?: string[];
  numberApplicants: number;
}
