import request from 'supertest';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import OffersController from '../OffersController';
import { IOfferTest } from '../../interfaces/IOffer';
import { offersList } from '../../lib/offersUtils';

const app = express();
const offersController = new OffersController();
const mockedOffers: IOfferTest[] = [
  {
    position: 'Becario para backend',
    publicationDate: '2024-07-23',
    description: 'Domina el manejo de las APIs con nosotros en un ambiente familiar.',
    companyOwner: '665364d8648859c8516c5b32',
    status: true,
    numberVacancies: 2,
    listApplicants: [],
    numberApplicants: 0
  },
  {
    position: 'Puesto de vespa',
    publicationDate: '2024-05-09',
    description: 'Ves-pa aquí, ves-pa allá!!',
    companyOwner: '665364d8648859c8516c5b32',
    status: true,
    numberVacancies: 2,
    listApplicants: [],
    numberApplicants: 3
  }
];

app.get('/offers', offersController.index);
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction): void => {
  res.status(500).json({ message: err.message });
});

jest.mock('../../lib/offersUtils', () => ({
  offersList: jest.fn(() => mockedOffers)
}));
const mockedOffer = jest.mocked(offersList); // This line converts the dep module into its mocked version and makes it easier to work with in TypeScript, since jest.mocked adds the appropriate types to it.

describe('OffersController', () => {
  describe('index', () => {
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods
      jest.clearAllMocks();
    });
    it('should return a list of offers with status 200', async () => {
      const response = await request(app).get('/offers');

      expect(response.status).toBe(200);
      expect(response.body.offers).toStrictEqual(mockedOffers);
      expect(mockedOffer).toHaveBeenCalledTimes(1);
    });
  });
});
