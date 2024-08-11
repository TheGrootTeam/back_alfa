import { Document, Types, Model, Query } from 'mongoose';

export interface IOfferPopulate {
  _id: Types.ObjectId;
  name: string;
}

export interface IOffer extends Document {
  position: string;
  publicationDate: Date;
  description: string;
  companyOwner: Types.ObjectId | IOfferPopulate;
  status: boolean;
  numberVacancies: number;
  listApplicants?: Types.ObjectId[];
  numberApplicants: number;
}

export interface IOfferModel extends Model<IOffer> {
  listing(filter: IOffersFilter, skip?: string, limit?: string, sort?: string): Query<IOffer[], IOffer>;
}

export interface IOffersFilter {
  id?: string;
  position?: RegExp | string;
  publicationDate?: string;
  description?: RegExp | string;
  companyOwner?: RegExp | string;
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

// -----------------InitDB -------------------
export interface IOfferEx {
  position: string;
  publicationDate: string;
  description: string;
  companyOwner: Types.ObjectId | string;
  status: boolean;
  numberVacancies: number;
  listApplicants?: Types.ObjectId[];
  numberApplicants: number;
}
