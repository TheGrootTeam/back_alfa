import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import LoginController from '../LoginController';
import { comparePassword } from '../../lib/utils';
import Applicant from '../../models/Applicant';
//import Company from '../../models/Company';
import { IApplicant } from '../../interfaces/IApplicant';
//import { ICompany } from '../../interfaces/ICompany';

import { HttpError } from 'http-errors';

// Mock the models and utility functions
jest.mock('../../models/Applicant');
jest.mock('../../models/Company');
jest.mock('../../lib/utils');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());

const loginController = new LoginController();
app.post('/login', (req: Request, res: Response, next: NextFunction) => loginController.post(req, res, next));

//Middleware de manejo de errores
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack); // Log del error para depuración
  res.status(500).json({ message: err.message });
});



describe('LoginController', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a JWT token for valid applicant credentials', async () => {

    //const mockApplicant: IApplicant = {
    const mockApplicant: Partial<IApplicant> = {
      dniCif: '12345678A',
      password: 'hashedPassword',
      // name: 'Antonio',
      // email: 'antonio@mail.es',
      // phone: '000000001',
      // photo: 'url-foto',
      // cv: 'url-cv',
      // ubication: 'Madrid',
      // role: 'presencial',
      // typeJob: 'renumerado',
      // wantedJob: 'lo que sea',
      // geographically_mobile: false,
      // disponibility: true,
      // preferredOffers: [],
      // suscribedOffers: [],
    };

    (Applicant.findOne as jest.Mock).mockResolvedValue(mockApplicant);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');




    // const mockedApplicant = jest.mocked(Applicant);
    // mockedApplicant.findOne.mockResolvedValue(mockApplicant);
    // const mockedComparePassword = jest.mocked(comparePassword);
    // mockedComparePassword.mockResolvedValue(true);
    // // const mockedJwtSign = jest.mocked(jwt.sign);
    // // mockedJwtSign.mockReturnValue('11qw2e2eddq3d3dqfafwfgw4gw');
    // const mockedJwtSign = jest.mocked(jwt.sign);
    // mockedJwtSign.mockImplementation(() => '11qw2e2eddq3d3dqfafwfgw4gw'); // Use mockImplementation




    const response = await request(app)
      .post('/login')
      .send({ dniCif: '12345678A', password: 'hashedPassword' });

    console.log('STATUS: ', response.status);
    console.log('RESPONSE BODY: ', response.body);
    console.log('TOKENJWT: ', response.body.tokenJWT);

    expect(response.status).toBe(200);
    expect(response.body.tokenJWT).toBe('mockToken');
    //expect(response.body.tokenJWT).toBe('11qw2e2eddq3d3dqfafwfgw4gw'); //ANtes mockToken




    // it('should return a JWT token for valid company credentials', async () => {
    //   const mockCompany: ICompany = {
    //     dniCif: '87654321B',
    //     password: 'hashedPassword',
    //   };

    //   (Applicant.findOne as jest.Mock).mockResolvedValue(null);
    //   (Company.findOne as jest.Mock).mockResolvedValue(mockCompany);
    //   (comparePassword as jest.Mock).mockResolvedValue(true);
    //   (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    //   const response = await request(app)
    //     .post('/login')
    //     .send({ dniCif: '87654321B', password: 'password' });

    //   expect(response.status).toBe(200);
    //   expect(response.body.tokenJWT).toBe('mockToken');
    // });


    // it('should return 401 for invalid credentials', async () => {
    //   (Applicant.findOne as jest.Mock).mockResolvedValue(null);
    //   (Company.findOne as jest.Mock).mockResolvedValue(null);

    //   const response = await request(app)
    //     .post('/login')
    //     .send({ dniCif: 'invalidDniCif', password: 'password' });

    //   expect(response.status).toBe(401);
    //   expect(response.body.error).toBe('Invalid credentials');
    // });

  });
});