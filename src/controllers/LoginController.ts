import Applicant from '../models/Applicant';
import Company from '../models/Company';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { comparePassword } from '../lib/utils';
import { IApplicant } from '../interfaces/IApplicant';
import { ICompany } from '../interfaces/ICompany';

export default class LoginController {

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { dniCif, password } = req.body;

      // find user in Applicants and Companies collections
      //const userApplicant: IApplicant | null = await Applicant.findOne({ dniCif: dniCif }).exec(); <- The exec make a failure in tje test
      const userApplicant: IApplicant | null = await Applicant.findOne({ dniCif: dniCif });
      let userCompany: ICompany | null = null;
      if (!userApplicant) {
        //userCompany = await Company.findOne({ dniCif: dniCif }).exec(); <- The exec make a failure in the test
        userCompany = await Company.findOne({ dniCif: dniCif });
      }
      const user = userApplicant ? userApplicant : userCompany;

      if (user !== null) {
        const itsOk: boolean = await comparePassword(password, user.password);
        // throw error if don't find the user or the passward to be incorrect
        if (!user || !(itsOk)) {
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }
      }

      let tokenJWT: string | null = null;
      if (user !== null) {
        tokenJWT = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
          expiresIn: '2h'
        });
      }

      if (tokenJWT !== null) {
        res.json({ tokenJWT: tokenJWT });
      }
      else {
        res.status(401).json({ error: 'Invalid credentials' });
      }

    } catch (error) {
      next(error);
    }
  }
}
