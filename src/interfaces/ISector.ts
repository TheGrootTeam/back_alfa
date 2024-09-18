import { Types } from 'mongoose';

export interface ISectorsModel extends Document {
  sector: string;
  _id: Types.ObjectId;
}
