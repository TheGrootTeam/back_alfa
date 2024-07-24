import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, _res: Response, next: NextFunction) => {
  // token can be in the header, body or as query string
  const tokenJWT = req.get('Authorization') || req.body.jwt || req.query.jwt

  // if there is no token throw error using http-errors
  if (!tokenJWT) {
    next(createError(401, 'No token provided'));
    return;
  }

  // verify jwt
  jwt.verify(tokenJWT, process.env.JWT_SECRET as string, (err, payload) => {
    if (err) {
      next(createError(401, 'Invalid token'));
      return;
    }
    // add userid data to req so next middlewares can use the variable
    req.apiUserId = payload.userId;
    next();
  })

}