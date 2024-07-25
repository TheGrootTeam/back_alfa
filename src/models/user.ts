import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; //import library to hash passwords
import { IUser, IUserModel } from '../interfaces/IUser';

//set user schema
const userSchema = new mongoose.Schema<IUser>({
  dniCif: { type: String, required: true },
  password: { type: String, required: true },
  isCompany: { type: Boolean, required: true }, //true: company - false: applicant
  email: { type: String, required: true }

  // xxx: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Xxx',
  //   required: false
  // }]
});

//create a hash for password
userSchema.statics.hashPassword = function (password: string): Promise<string> {
  return bcrypt.hash(password, 10);
};

//verify password
userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// create user model and export
const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;
