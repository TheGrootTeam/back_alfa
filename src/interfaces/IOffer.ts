import { Document, Types, Model } from 'mongoose';

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

export interface IOfferModel extends Model<IOffer> {
  listing(filter: IOffersFilter, skip?: string, limit?: string, sort?: string): Promise<IOffer[]>;
}

export interface IOffersFilter {
  id?: string;
  position?: RegExp;
  publicationDate?: string;
  description?: string;
  companyOwner?: {
    $in: string;
  };
  status?: string;
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
