import createError from 'http-errors';
import { Response, NextFunction } from 'express';
import { CustomRequest, JwtPayload } from '../interfaces/IauthJWT';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export default (req: CustomRequest, _res: Response, next: NextFunction) => {
  // Get token from header, body, or query string
  let tokenJWT = req.headers['authorization'] || req.headers['Authorization'];

  // Log the token to verify it's being received correctly
  console.log('Received Token:', tokenJWT);

  // If tokenJWT exists, remove "Bearer" prefix if present
  if (tokenJWT && typeof tokenJWT === 'string' && tokenJWT.startsWith('Bearer ')) {
    tokenJWT = tokenJWT.slice(7, tokenJWT.length).trim();
  }

  // If there is no token, throw an error
  if (!tokenJWT) {
    next(createError(401, 'No token provided'));
    return;
  }

  // Verify JWT
  jwt.verify(tokenJWT, process.env.JWT_SECRET as string, (err: VerifyErrors | null, payload: unknown) => {
    if (err) {
      next(createError(401, 'Invalid token'));
      return;
    }

    // Add userId to req so next middlewares can use the variable
    req.apiUserId = (payload as JwtPayload).userId;
    next();
  });
};
