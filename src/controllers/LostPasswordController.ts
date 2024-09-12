import { Request, Response, NextFunction } from 'express';
import Company from '../models/Company';
import Applicant from '../models/Applicant';
import createError from 'http-errors';
import TokenLostPassword from '../models/TokenLostPassword';
import jwt from 'jsonwebtoken';

export default class LostPasswordController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.params.email;
      let jwtToken = '';

      let user = await Company.findOne({ email });

      if (!user) {
        user = await Applicant.findOne({ email });
      }

      if (user) {
        const token = await TokenLostPassword.findOne({ userId: user._id.toString() });
        // create new jwtToken
        jwtToken = await jwt.sign({ user: user._id.toString() }, process.env.JWT_SECRET as string, {
          expiresIn: '1h'
        });

        if (token) {
          // modifie token for document if exist
          await TokenLostPassword.findByIdAndUpdate(token._id, { token: jwtToken });
        } else {
          // save token in bbdd
          const newtoken = new TokenLostPassword({ token: jwtToken, userId: user._id.toString() });
          await newtoken.save();
        }
        const url = `http://${req.host}/lost-password/${jwtToken}`;
        res.status(200).json({ email, name: user.name, url });
      } else {
        next(createError(404, 'No user with this email'));
        return;
      }
    } catch (error) {
      next(error);
    }
  }
}
