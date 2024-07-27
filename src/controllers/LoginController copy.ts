import User from '../models/User';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default class LoginController {
  // index(_req: Request, res: Response, _next: NextFunction) {
  //   res.json({ token: 'Token desde LoginController!' });
  // }
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { dniCif, password } = req.body;
      // find user in db
      const user = await User.findOne({ dniCif: dniCif }).exec();
      // throw error if don't find the user
      if (!user || !user.comparePassword(password)) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // if user exists and password is correct set a JWT with userID data
      const tokenJWT = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '2h'
      });

      res.json({ tokenJWT: tokenJWT });
    } catch (error) {
      next(error);
    }
  }
}
