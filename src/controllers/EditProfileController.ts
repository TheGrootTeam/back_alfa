import Applicant from '../models/Applicant';
import Company from '../models/Company';
import { Request, Response, NextFunction } from 'express';
import { Document, FilterQuery, UpdateQuery, QueryOptions, Model } from 'mongoose';

export default class ProfileController {
  // Method for updating the profile
  async updateProfile(req: Request, res: Response, _next: NextFunction) {
    try {
      const { dniCif, isCompany, ...updateData } = req.body;

      if (!dniCif || isCompany === undefined) {
        return res.status(400).json({ message: 'dniCif and isCompany fields are required' });
      }

      // Use a union type to accommodate both models
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const model: Model<any> = isCompany ? Company : Applicant;

      // Define the filter and update queries
      const filter: FilterQuery<Document> = { dniCif };
      const update: UpdateQuery<Document> = updateData;
      const options: QueryOptions = { new: true };

      // Use "model.findOneAndUpdate" with the properly typed queries
      const user = await model.findOneAndUpdate(filter, update, options).exec();

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error('Error in updateProfile:', error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
