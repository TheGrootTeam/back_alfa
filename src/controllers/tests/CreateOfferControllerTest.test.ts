import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { Types } from 'mongoose';
import CreateOfferController from '../CreateOfferController';
import Offer from '../../models/Offer';
import { IOffer } from '../../interfaces/IOffer';

// Mock the models
jest.mock('../../models/Offer');

const app = express();
app.use(express.json());

const createOfferController = new CreateOfferController();
//Defining a "post" route
app.post('/offers', (req: Request, res: Response, next: NextFunction) => createOfferController.post(req, res, next));
//Error handling middleware
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack); // Log to depuration
  res.status(500).json({ message: err.message });
});

describe('CreateOfferController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('I should register a new offer and return a 201', async () => {
    const mockOffer: Partial<IOffer> = {
      position: "Casos de prueba",
      publicationDate: new Date("2024-08-06"),
      description: "Tareas de prueba. No se garantiza la supervivencia",
      companyOwner: new Types.ObjectId("66af6457d7a2d8a5d161b3aa"),
      status: true,
      numberVacancies: 3,
      listApplicants: undefined,
      numberApplicants: 1,
    };

    //Use better the save method
    //(Offer.insertMany as jest.Mock).mockResolvedValue([mockOffer]);

    //Create an instance of the Offer model and mock the save method
    const offerInstance = new Offer(mockOffer);
    (offerInstance.save as jest.Mock).mockResolvedValue(offerInstance);

    console.log('XX Mock Offer:', mockOffer);

    const response = await request(app)
      .post('/offers')
      .send(mockOffer);

    console.log('XX Response Status:', response.status);
    console.log('XX Response Body:', response.body);


    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Offer registered successfully');

  });


});




