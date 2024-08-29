import createError from 'http-errors';
import { Response, NextFunction } from 'express';
import { CustomRequest, JwtPayload } from '../interfaces/IauthJWT';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export default (req: CustomRequest, _res: Response, next: NextFunction) => {
  // token can be in the header, body or as query string
  const tokenBearer = req.headers['authorization'] || req.headers['Authorization'];
  let tokenJWT: string | undefined;

  if (tokenBearer) {
    const tokenparts = tokenBearer.split(' ');
    tokenJWT = tokenparts[1];
  }

  // if there is no token throw error using http-errors
  if (!tokenJWT) {
    next(createError(401, 'No token provided'));
    return;
  }

  // verify jwt
  jwt.verify(tokenJWT, process.env.JWT_SECRET as string, (err: VerifyErrors | null, payload: unknown) => {
    if (err) {
      next(createError(401, 'Invalid token'));
      return;
    }

    // add userid data to req so next middlewares can use the variable
    req.apiUserId = (payload as JwtPayload).userId;
    next();
  });
};
