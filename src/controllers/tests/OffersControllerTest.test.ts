import request from 'supertest';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import OffersController from '../OffersController';
import Offer from '../../models/Offer';
import { IOfferTest } from '../../interfaces/IOffer';

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

jest.mock('../../models/Offer');
const mockedOffer = jest.mocked(Offer); // This line converts the dep module into its mocked version and makes it easier to work with in TypeScript, since jest.mocked adds the appropriate types to it.

describe('OffersController', () => {
  describe('index', () => {
    it('should return a list of offers with status 200', async () => {
      mockedOffer.find.mockImplementation(
        () =>
          ({
            populate: jest.fn().mockResolvedValue(mockedOffers)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }) as any
      );

      const response = await request(app).get('/offers');

      expect(response.status).toBe(200);
      expect(response.body.offers).toStrictEqual(mockedOffers);
      expect(mockedOffer.find).toHaveBeenCalledTimes(1);
    });

    it('should return an error with status 500', async () => {
      const mockedErrorMessage = 'Internal Server Error';

      mockedOffer.find.mockImplementation(
        () =>
          ({
            populate: jest.fn().mockRejectedValue(new Error(mockedErrorMessage))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }) as any
      );

      const response = await request(app).get('/offers');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe(mockedErrorMessage);
    });
  });
});
