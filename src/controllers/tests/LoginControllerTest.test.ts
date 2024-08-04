import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
//import Applicant from '../../models/Applicant';
//import Company from '../../models/Company';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/proyecto';

describe('LoginController', () => {

  beforeAll(async () => {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });


  describe('POST /login', () => {
    it('should log in an existing applicant user', async () => {
      const res = await request(app)
        .post('/api/v1/login')
        .send({
          dniCif: '000000000A',
          password: '123',
          isCompany: false,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('tokenJWT');
      expect(typeof res.body.tokenJWT).toBe('string');
    });

    it('should log in an existing company user', async () => {
      const res = await request(app)
        .post('/api/v1/login')
        .send({
          dniCif: 'A000666',
          password: '123',
          isCompany: true,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('tokenJWT');
      expect(typeof res.body.tokenJWT).toBe('string');
    });


    it('should not log in a non-existent user (applicant or company)', async () => {
      // Create an existing applicant user first
      // await request(app)
      //   .post('/api/v1/login')
      //   .send({
      //     dniCif: '12345678A',
      //     password: 'password123',
      //     isCompany: false,
      //   });

      //User not-existent
      const res = await request(app)
        .post('/api/v1/login')
        .send({
          dniCif: '87654321B',
          password: 'password123',
          isCompany: true,
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });


    it('should not log in a user with a wrong password', async () => {
      // Create an existing applicant user first
      // await request(app)
      //   .post('/api/v1/login')
      //   .send({
      //     dniCif: '12345678A',
      //     password: 'password123',
      //     isCompany: false,
      //   });

      //Is entered a wrong password
      const res = await request(app)
        .post('/api/v1/login')
        .send({
          dniCif: '12345678A',
          password: 'passwordWRONG',
          isCompany: false,
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });

    //This verifies that a 400 error is returned if required fields are missing.
    it('should return 401 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/login')
        .send({
          dniCif: '',
          password: '',
          isCompany: undefined,
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });
  });
});
