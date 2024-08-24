import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import RegisterController from '../RegisterController';
import Applicant from '../../models/Applicant';
import Company from '../../models/Company';
import Sector from '../../models/Sector';

// Mocking the models
jest.mock('../../models/Applicant');
jest.mock('../../models/Company');
jest.mock('../../models/Sector');

// Create the Express application for testing
const app = express();
app.use(express.json());

// Instantiate the controller and define the route
const registerController = new RegisterController();
app.post('/register', (req: Request, res: Response, next: NextFunction) =>
  registerController.register(req, res, next)
);

// Error handling middleware
app.use(
  (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack); // Log for debugging
    res.status(500).json({ message: err.message });
  }
);

jest.setTimeout(10000); // Incrementa el tiempo de espera a 10 segundos

describe('RegisterController', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Configurar el mock para Sector
    (Sector.findOne as jest.Mock).mockResolvedValue({
      _id: '60d9f2f8f8d9c9a2f8d9f2f8', // Un ObjectId simulado
      sector: 'Default Sector'
    });

    // Mock para el método save si es necesario crear un nuevo sector
    (Sector.prototype.save as jest.Mock).mockResolvedValue({});
  });

  describe('POST /register', () => {
    it('should register a new applicant', async () => {
      // Set up the mock so that findOne returns null (user not found)
      (Applicant.findOne as jest.Mock).mockResolvedValue(null);
      (Company.findOne as jest.Mock).mockResolvedValue(null);

      // Mock the save function of the prototype
      const saveMock = jest.fn().mockResolvedValue({});
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
      (Applicant.findOne as jest.Mock).mockResolvedValue(null);
      (Company.findOne as jest.Mock).mockResolvedValue(null);

      // Mock the save function of the prototype
      const saveMock = jest.fn().mockResolvedValue({});
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
      // Set up the mock so that Applicant's findOne returns a user (email already exists)
      (Applicant.findOne as jest.Mock).mockResolvedValue({
        email: 'existing@example.com',
      });

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

    // Additional tests can be added as needed
  });
});
