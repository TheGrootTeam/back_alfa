import { Request, Response, NextFunction } from 'express';
import { searchOffers } from '../lib/searchUtils';

export default class SearchController {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.query as any;
      const result = await searchOffers(params);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
