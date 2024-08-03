import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import LoginController from '../LoginController';
import { comparePassword } from '../../lib/utils';
import Applicant from '../../models/Applicant';
import Company from '../../models/Company';
import { IApplicant } from '../../interfaces/IApplicant';
import { ICompany } from '../../interfaces/ICompany';

// Mock the models and utility functions
jest.mock('../models/Applicant');
jest.mock('../models/Company');
jest.mock('../lib/utils');

const app = express();
app.use(express.json());

const loginController = new LoginController();
app.post('/login', (req: Request, res: Response, next: NextFunction) => loginController.post(req, res, next));

describe('LoginController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a JWT token for valid applicant credentials', async () => {
    const mockApplicant: IApplicant = {
      dniCif: '12345678A',
      password: 'hashedPassword',
    };

    (Applicant.findOne as jest.Mock).mockResolvedValue(mockApplicant);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    const response = await request(app)
      .post('/login')
      .send({ dniCif: '12345678A', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.tokenJWT).toBe('mockToken');
  });

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
