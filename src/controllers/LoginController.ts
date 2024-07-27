import User from '../models/User'; 

import Applicant from '../models/Applicant';
import Company from '../models/Company';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { debug } from 'console';

export default class LoginController {
  
  // index(_req: Request, res: Response, _next: NextFunction) {
  //   res.json({ token: 'Token desde LoginController!' });
  // }
  async post(req: Request, res: Response, next: NextFunction) {
    
    try {
      const { dniCif, password } = req.body;
      // find user in Applicant collection
      //const user = await User.findOne({ dniCif: dniCif }).exec();
      
      const userApplicant = await Applicant.findOne({ dniCif: dniCif }).exec();
      const userCompany = await Company.findOne({ dniCif: dniCif }).exec();

      debug ("ASpirante:", userApplicant);
      debug ("Empresa:", userCompany);

      const user = userApplicant? userApplicant : userCompany;
      
      // debug("usuario aspirante: ", userApplicant);
      // // If are note ressults, i find in Companies collection
      // if (!userApplicant) {
      //   const userCompany = await Company.findOne({ dniCif: dniCif }).exec();
      //   debug("usuario empresa: ", userCompany)
      // }
      // throw error if don't find the user
      //if (!user || !user.comparePassword(password)) {
      //if (!user || user.comparePassword(password)) {
        if (!user || user.password != password) {
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
