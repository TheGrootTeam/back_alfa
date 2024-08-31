import { Request } from 'express';

export interface ParamsProfileController extends Request {
  params: {
    userId: string;
    applicantOrCompany: string;
  };
}
