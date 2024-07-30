import { Document, Types } from "mongoose";

export interface ICompany extends Document{
  dniCif: string;
  password: string; // Apply hash
  name: string;
  email: string;
  phone: string;
  sector: string;
  ubication: string;
  description: string;
  publishedOffers?: Types.ObjectId[];
}