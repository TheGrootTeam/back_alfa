import request from 'supertest';
import express from 'express';
import OffersController from '../OffersController';
import Offer from '../../models/Offer';

const app = express();
const offersController = new OffersController();

app.get('/offers', offersController.index);
jest.mock('../../models/Offer');
const mockedOffer = jest.mocked(Offer); // This line converts the dep module into its mocked version and makes it easier to work with in TypeScript, since jest.mocked adds the appropriate types to it.

describe('OffersController', () => {
  describe('index', () => {
    it('should return a list of offers with status 200', async () => {
      const mockedoffers = [
        { id: '834sdfdsf234', position: 'Desarrollador Backend' },
        { id: '4fds24df2243', position: 'Desarrollador Frontend' }
      ];

      mockedOffer.find.mockResolvedValue(mockedoffers);

      const response = await request(app).get('/offers');

      expect(response.status).toBe(200);
      expect(response.body.offers).toStrictEqual(mockedoffers);
      expect(mockedOffer.find).toHaveBeenCalledTimes(1);
    });
  });
});
