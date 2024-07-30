import Applicant from '../models/Applicant';
import Company from '../models/Company';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { debug } from 'console'
import {comparePassword, hashPassword } from '../lib/utils';
import { IUser } from '../interfaces/IUser';
import { IApplicant } from '../interfaces/IApplicant';
import { ICompany } from '../interfaces/ICompany';
import { Document } from 'mongoose';

export default class LoginController {

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { dniCif, password, isCompany, email } = req.body;

      // validateFields
      if (!dniCif || !password || isCompany === undefined || !email) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      // Verify if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Password hash
      const hashedPassword = await hashPassword(password);

      // Create new user
      const user = new User({
        dniCif,
        password: hashedPassword,
        isCompany,
        email,
      });

      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      next(error);
    }
  }
  
  // index(_req: Request, res: Response, _next: NextFunction) {
  //   res.json({ token: 'Token desde LoginController!' });
  // }
  async post(req: Request, res: Response, next: NextFunction) {
    
    try {
      const { dniCif, password } = req.body;
      
      // find user in Applicants and Companies collections
      
      const userApplicant: IApplicant | null = await Applicant.findOne({ dniCif: dniCif }).exec();

      let userCompany: ICompany | null = null;

      //const userCompany: ICompany | null = await Company.findOne({ dniCif: dniCif }).exec();

      //userCompany = userApplicant ? null : await Company.findOne({ dniCif: dniCif }).exec();
      if (!userApplicant){
         userCompany = await Company.findOne({ dniCif: dniCif }).exec();
      }

      

      debug("userApplicant ", userApplicant);
      debug ("userCompany", userCompany);

      const user = userApplicant ? userApplicant : userCompany;
      debug ("user ", user);
      
  

      // throw error if don't find the user
      if (!user || !(await comparePassword(password, user.password))) {
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
