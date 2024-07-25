import { Request } from 'express';

export interface CustomRequest extends Request {
  apiUserId: string;
}

export interface JwtPayload {
  userId: string;
}