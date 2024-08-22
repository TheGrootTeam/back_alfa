import { Request, Response, NextFunction } from 'express';

export default class InfoDashboardsController {
  index(_req: Request, res: Response, _next: NextFunction) {
    res.json({ message: 'Hola mundo desde InfoDashboardController!' });
  }
}
