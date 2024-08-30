import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import EditProfileController from '../EditProfileController';
import Applicant from '../../models/Applicant';
import Company from '../../models/Company';

// Mocking the models
jest.mock('../../models/Applicant');
jest.mock('../../models/Company');

// Create the Express application for testing
const app = express();
app.use(express.json());

// Instantiate the controller and define the route
const editprofileController = new EditProfileController();
app.put('/profile/update', (req: Request, res: Response, next: NextFunction) =>
  editprofileController.updateProfile(req, res, next)
);

// Error handling middleware
app.use(
  (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack); // Log for debugging
    res.status(500).json({ message: err.message });
  }
);

jest.setTimeout(10000); // Incrementa el tiempo de espera a 10 segundos

describe('EditProfileController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PUT /profile/update', () => {
    it('should update an existing applicant profile', async () => {
      // Mock de findOneAndUpdate con exec
      (Applicant.findOneAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          dniCif: '12345678A',
          name: 'Updated Name',
          email: 'updatedemail@example.com',
          phone: '999999999',
        }),
      });

      const res = await request(app)
        .put('/profile/update')
        .send({
          dniCif: '12345678A',
          isCompany: false,
          name: 'Updated Name',
          email: 'updatedemail@example.com',
          phone: '999999999',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        'message',
        'Profile updated successfully'
      );
      expect(Applicant.findOneAndUpdate).toHaveBeenCalledWith(
        { dniCif: '12345678A' },
        {
          $set: {
            name: 'Updated Name',
            email: 'updatedemail@example.com',
            phone: '999999999',
          },
        },
        { new: true }
      );
    });

    it('should update an existing company profile', async () => {
      // Mock de findOneAndUpdate con exec para la compañía
      (Company.findOneAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          dniCif: 'A000666',
          name: 'Updated Company Name',
          email: 'updatedcompanyemail@example.com',
          phone: '888888888',
          ubication: 'New Location',
          description: 'Updated description',
        }),
      });

      const res = await request(app)
        .put('/profile/update')
        .send({
          dniCif: 'A000666',
          isCompany: true,
          name: 'Updated Company Name',
          email: 'updatedcompanyemail@example.com',
          phone: '888888888',
          ubication: 'New Location',
          description: 'Updated description',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        'message',
        'Profile updated successfully'
      );
      expect(Company.findOneAndUpdate).toHaveBeenCalledWith(
        { dniCif: 'A000666' },
        {
          $set: {
            name: 'Updated Company Name',
            email: 'updatedcompanyemail@example.com',
            phone: '888888888',
            ubication: 'New Location',
            description: 'Updated description',
          },
        },
        { new: true }
      );
    });

    it('should return 404 if user is not found', async () => {
      // Mock de findOneAndUpdate con exec que retorna null
      (Applicant.findOneAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const res = await request(app)
        .put('/profile/update')
        .send({
          dniCif: 'nonexistentDniCif',
          isCompany: false,
          name: 'Nonexistent User',
          email: 'nonexistentemail@example.com',
          phone: '000000000',
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User not found');
      expect(Applicant.findOneAndUpdate).toHaveBeenCalledWith(
        { dniCif: 'nonexistentDniCif' },
        expect.any(Object),
        { new: true }
      );
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .put('/profile/update')
        .send({
          dniCif: '',
          isCompany: undefined,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'dniCif and isCompany fields are required');
    });
  });
});
