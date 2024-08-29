import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

export interface CustomRequest extends Request {
  headers: IncomingHttpHeaders & {
    Authorization?: string;
  };
  apiUserId?: string;
}

export interface JwtPayload {
  userId?: string;
}
