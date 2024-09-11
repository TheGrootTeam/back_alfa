import { Request, Response, NextFunction } from 'express';
import TokenLostPassword from '../models/TokenLostPassword';

export default class LostPasswordController {
  async index(_req: Request, res: Response, _next: NextFunction) {
    const newtoken = new TokenLostPassword({ token: 'sdfsd', userId: '66e0af5d73e71202eccae4d5' });
    const ola = await newtoken.save();
    console.log(ola);
    res.status(200).json({ hola: 'hola' });
  }
}
