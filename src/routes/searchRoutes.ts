import express from 'express';
import SearchController from '../controllers/SearchController';

const searchRoutes = express.Router();
const searchController = new SearchController();

searchRoutes.get('/', (req, res, next) => {
  searchController.search(req, res, next);
});

export default searchRoutes;
