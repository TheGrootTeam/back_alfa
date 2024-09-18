import { Types } from 'mongoose';

export interface IRolsModel extends Document {
  rol: string;
  _id: Types.ObjectId;
}
