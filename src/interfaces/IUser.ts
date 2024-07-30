//NO VÁLIDO: DEBE BORRARSE
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
