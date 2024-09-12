import { Request, Response, NextFunction } from 'express';
import Company from '../models/Company';
import Applicant from '../models/Applicant';
import createError from 'http-errors';
// import TokenLostPassword from '../models/TokenLostPassword';

export default class LostPasswordController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email;

      let user = await Company.findOne({ email });

      if (!user) {
        user = await Applicant.findOne({ email });
      }

      if (user) {
        // const newtoken = new TokenLostPassword({ token: 'sdfsd', userId: '66e0af5d73e71202eccae4d5' });
        // const ola = await newtoken.save();
        // console.log(ola);
        res.status(200).json({ email });
      } else {
        next(createError(404, 'No user with this email'));
        return;
      }
    } catch (error) {
      next(error);
    }
  }
}
