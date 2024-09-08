import { Request, Response, NextFunction } from 'express';
import { searchOffers } from '../lib/searchUtils';

export default class SearchController {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.query as any;
      console.log('Search params:', params);
      const result = await searchOffers(params);
      res.status(200).json(result);
    } catch (error) {
      console.error('Search error:', error);
      next(error);
    }
  }
}
