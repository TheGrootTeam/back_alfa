
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import RegisterController from '../RegisterController';
import Applicant from '../../models/Applicant';
import Company from '../../models/Company';

// Mockeando the models
jest.mock('../../models/Applicant');
jest.mock('../../models/Company');

// create the express application for the tests
const app = express();
app.use(express.json());

// instant the controller and define the route
const registerController = new RegisterController();
app.post('/register', (req: Request, res: Response, next: NextFunction) =>
  registerController.register(req, res, next)
);

// Middleware for error management
app.use(
  (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack); // Log for purification
    res.status(500).json({ message: err.message });
  }
);

describe('RegisterController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should register a new applicant', async () => {
      // Configure the mock to find Null returns (User not found)
      (Applicant.findOne as jest.Mock).mockResolvedValueOnce(null);
      (Company.findOne as jest.Mock).mockResolvedValueOnce(null);

      // Simulate the Save function of the prototype
      const saveMock = jest.fn().mockResolvedValueOnce({});
      (Applicant.prototype.save as jest.Mock) = saveMock;

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '12345678A',
          password: 'password123',
          isCompany: false,
          email: 'applicant@example.com',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty(
        'message',
        'User registered successfully'
      );
      expect(Applicant.findOne).toHaveBeenCalledWith({
        email: 'applicant@example.com',
      });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should register a new company', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValueOnce(null);
      (Company.findOne as jest.Mock).mockResolvedValueOnce(null);

      // Simulate the Save function of the prototype
      const saveMock = jest.fn().mockResolvedValueOnce({});
      (Company.prototype.save as jest.Mock) = saveMock;

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '87654321B',
          password: 'password123',
          isCompany: true,
          email: 'company@example.com',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty(
        'message',
        'User registered successfully'
      );
      expect(Company.findOne).toHaveBeenCalledWith({
        email: 'company@example.com',
      });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should not register a user with an existing email', async () => {
      // Configure the mock to find a user return a user (email already exists)
      (Applicant.findOne as jest.Mock).mockResolvedValueOnce({
        email: 'existing@example.com',
      });
      // We do not need to configure Company.

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '87654321B',
          password: 'password123',
          isCompany: true,
          email: 'existing@example.com',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
      expect(Applicant.findOne).toHaveBeenCalledWith({
        email: 'existing@example.com',
      });
      expect(Company.findOne).not.toHaveBeenCalled(); 
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '',
          password: '',
          isCompany: undefined,
          email: '',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'All fields are required');
    });
  });
});
