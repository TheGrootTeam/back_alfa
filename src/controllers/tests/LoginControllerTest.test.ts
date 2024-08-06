import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from 'http-errors';
import LoginController from '../LoginController';
import { comparePassword } from '../../lib/utils';
import Applicant from '../../models/Applicant';
import Company from '../../models/Company';
import { IApplicant } from '../../interfaces/IApplicant';
import { ICompany } from '../../interfaces/ICompany';




// Mock the models and utility functions
jest.mock('../../models/Applicant');
jest.mock('../../models/Company');
jest.mock('../../lib/utils');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());


const loginController = new LoginController();
app.post('/login', (req: Request, res: Response, next: NextFunction) => loginController.post(req, res, next));

//Error handling middleware
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack); // Log to depuration
  res.status(500).json({ message: err.message });
});


describe('LoginController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a JWT token for valid applicant credentials', async () => {

    const mockApplicant: Partial<IApplicant> = {
      dniCif: '12345678A',
      password: 'hashedPassword',
    };

    (Applicant.findOne as jest.Mock).mockResolvedValue(mockApplicant);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    const response = await request(app)
      .post('/login')
      //.send({ dniCif: '12345678A', password: 'hashedPassword' });
      .send(mockApplicant);

    expect(response.status).toBe(200);
    expect(response.body.tokenJWT).toBe('mockToken');
  });


  it('should return a JWT token for valid company credentials', async () => {

    const mockCompany: Partial<ICompany> = {
      dniCif: 'A12345678',
      password: 'hashedPassword',
    };

    (Company.findOne as jest.Mock).mockResolvedValue(mockCompany);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    const response = await request(app)
      .post('/login')
      .send(mockCompany);

    expect(response.status).toBe(200);
    expect(response.body.tokenJWT).toBe('mockToken');
  });


  it('Should return 401 for invalid applicant password', async () => {

    const mockApplicant: Partial<IApplicant> = {
      dniCif: '12345678A',
      password: 'wrongPassword'
    };

    (Applicant.findOne as jest.Mock).mockResolvedValue(mockApplicant);
    (comparePassword as jest.Mock).mockResolvedValue(false);

    const response = await request(app)
      .post('/login')
      .send(mockApplicant);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });


  it('Should return 401 for invalid company password', async () => {

    const mockCompany: Partial<ICompany> = {
      dniCif: 'A12345678',
      password: 'wrongPassword'
    };

    (Company.findOne as jest.Mock).mockResolvedValue(mockCompany);
    (comparePassword as jest.Mock).mockResolvedValue(false);

    const response = await request(app)
      .post('/login')
      .send(mockCompany);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });


  it('should return 401 for invalid credentials', async () => {
    (Applicant.findOne as jest.Mock).mockResolvedValue(null);
    (Company.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send({ dniCif: 'invalidDniCif', password: 'password' });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });


});