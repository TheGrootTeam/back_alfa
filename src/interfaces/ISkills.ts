import { Types } from 'mongoose';

export interface ISkillsModel extends Document {
  skill: string;
  _id: Types.ObjectId;
}
