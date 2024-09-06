// TO USE FOR EDIT DASHBORDS (WAS DEVELOPED FOR REGISTER BUT NOT USED NOW)

//import Applicant from '../models/Applicant';
// import Company from '../models/Company';
// import { Request, Response, NextFunction } from 'express';
// import { Document, FilterQuery, UpdateQuery, QueryOptions, Model } from 'mongoose';

// export default class EditProfileController {
//   // Method for updating the profile
//   async index(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { dniCif, isCompany, ...updateData } = req.body;

//       if (!dniCif || typeof isCompany !== 'boolean') {
//         return res.status(400).json({ message: 'dniCif and isCompany fields are required' });
//       }

//       // Use the appropriate model based on isCompany flag
//       const model: Model<Document> = isCompany
//         ? (Company as unknown as Model<Document>)
//         : (Applicant as unknown as Model<Document>);

//       // Define the filter and update queries
//       const filter: FilterQuery<Document> = { dniCif };
//       const update: UpdateQuery<Document> = { $set: updateData };
//       const options: QueryOptions = { new: true };

//       // Use "model.findOneAndUpdate" with the properly typed queries
//       const user = await model.findOneAndUpdate(filter, update, options).exec();

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       return res.status(200).json({ message: 'Profile updated successfully', user });
//     } catch (error) {
//       next(error);
//     }
//   }
// }
