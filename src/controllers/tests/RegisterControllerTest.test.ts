import mongoose from 'mongoose';
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import RegisterController from '../RegisterController';
import Applicant from '../../models/Applicant';
import Company from '../../models/Company';
import Sector from '../../models/Sector';

jest.mock('../../models/Applicant');
jest.mock('../../models/Company');
jest.mock('../../models/Sector');

const app = express();
app.use(express.json());

const registerController = new RegisterController();
app.post('/register', (req: Request, res: Response, next: NextFunction) =>
  registerController.register(req, res, next)
);

app.use(
  (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  }
);

jest.setTimeout(10000);

describe('RegisterController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (Sector.findOne as jest.Mock).mockResolvedValue({
      _id: '60d9f2f8f8d9c9a2f8d9f2f8',
      sector: 'Default Sector',
    });
    (Sector.prototype.save as jest.Mock).mockResolvedValue({});
  });

  describe('POST /register', () => {
    it('should register a new applicant', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValue(null);
      (Company.findOne as jest.Mock).mockResolvedValue(null);
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
      expect(res.body).toHaveProperty('message', 'User registered successfully');
      expect(Applicant.findOne).toHaveBeenCalledWith({ email: 'applicant@example.com' });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should register a new company', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValue(null);
      (Company.findOne as jest.Mock).mockResolvedValue(null);
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
      expect(res.body).toHaveProperty('message', 'User registered successfully');
      expect(Company.findOne).toHaveBeenCalledWith({ email: 'company@example.com' });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should not register a user with an existing email', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValue({ email: 'existing@example.com' });
      (Company.findOne as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '98765432Z',
          password: 'password123',
          isCompany: true,
          email: 'existing@example.com',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
      expect(Applicant.findOne).toHaveBeenCalledWith({ email: 'existing@example.com' });
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

    it('should not register a user with an existing dniCif', async () => {
      (Applicant.findOne as jest.Mock)
        .mockResolvedValueOnce(null) // For email check
        .mockResolvedValueOnce({ dniCif: '12345678A' }); // For dniCif check
      (Company.findOne as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '12345678A',
          password: 'password123',
          isCompany: true,
          email: 'unique-email@example.com',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'CIF/NIF already exists');
      expect(Applicant.findOne).toHaveBeenCalledWith({ dniCif: '12345678A' });
    });

    // Extended tests

    it('should apply default values if optional fields are missing for Applicant', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValue(null);
      (Company.findOne as jest.Mock).mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue({});
      (Applicant.prototype.save as jest.Mock) = saveMock;

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '99999999A',
          password: 'password123',
          isCompany: false,
          email: 'newapplicant@example.com',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
      expect(Applicant.findOne).toHaveBeenCalledWith({ email: 'newapplicant@example.com' });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should apply default values if optional fields are missing for Company', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValue(null);
      (Company.findOne as jest.Mock).mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue({});
      (Company.prototype.save as jest.Mock) = saveMock;

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '99999999B',
          password: 'password123',
          isCompany: true,
          email: 'newcompany@example.com',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
      expect(Company.findOne).toHaveBeenCalledWith({ email: 'newcompany@example.com' });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should handle arrays for wantedRol and mainSkills correctly', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue({});
      (Applicant.prototype.save as jest.Mock) = saveMock;

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '88888888A',
          password: 'password123',
          isCompany: false,
          email: 'anotherapplicant@example.com',
          wantedRol: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
          mainSkills: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()]
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
      expect(Applicant.findOne).toHaveBeenCalledWith({ email: 'anotherapplicant@example.com' });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should handle multiple values in typeJob and internType for Applicant', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue({});
      (Applicant.prototype.save as jest.Mock) = saveMock;

      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '77777777A',
          password: 'password123',
          isCompany: false,
          email: 'applicantwithmultiplejobs@example.com',
          typeJob: ['presencial', 'teletrabajo'],
          internType: ['renumerado', 'voluntariado'],
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
      expect(Applicant.findOne).toHaveBeenCalledWith({ email: 'applicantwithmultiplejobs@example.com' });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should return 400 if email already exists for Applicant', async () => {
      (Applicant.findOne as jest.Mock).mockResolvedValue({ email: 'existing@example.com' });
      const res = await request(app)
        .post('/register')
        .send({
          dniCif: '12345678A',
          password: 'password123',
          isCompany: false,
          email: 'existing@example.com',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });

  });
});
