import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import User from '../../models/User';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/proyecto_test';

const connectTestDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('### Connected to MongoDB for tests');
  } catch (err) {
    console.error('### Error connecting to MongoDB for tests:', err);
    process.exit(1);
  }
};

describe('RegisterController', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clean the database after each test
    await User.deleteMany({});
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/register')
        .send({
          dniCif: '12345678A',
          password: 'password123',
          isCompany: false,
          email: 'user@example.com',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');

      const user = await User.findOne({ email: 'user@example.com' });
      expect(user).toBeTruthy();
      expect(user?.dniCif).toBe('12345678A');
      expect(user?.isCompany).toBe(false);
      // We do not verify the password directly because it is have you have
    });

    it('should not register a user with an existing email', async () => {
      // Create an existing user first
      await request(app)
        .post('/api/v1/register')
        .send({
          dniCif: '12345678A',
          password: 'password123',
          isCompany: false,
          email: 'existing@example.com',
        });

      const res = await request(app)
        .post('/api/v1/register')
        .send({
          dniCif: '87654321B',
          password: 'password123',
          isCompany: true,
          email: 'existing@example.com',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/register')
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
