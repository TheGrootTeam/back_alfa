// import request from 'supertest';
// import app from '../../app';
// import mongoose from 'mongoose';
// import Applicant from '../../models/Applicant';
// import Company from '../../models/Company';

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/proyecto';

// describe('RegisterController', () => {
//   beforeAll(async () => {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     } as mongoose.ConnectOptions);
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   afterEach(async () => {
//     // Limpiar la base de datos después de cada prueba
//     await Applicant.deleteMany({});
//     await Company.deleteMany({});
//   });

//   describe('POST /register', () => {
//     it('should register a new applicant', async () => {
//       const res = await request(app)
//         .post('/api/v1/register')
//         .send({
//           dniCif: '12345678A',
//           password: 'password123',
//           isCompany: false,
//           email: 'applicant@example.com'
//         });

//       expect(res.statusCode).toEqual(201);
//       expect(res.body).toHaveProperty('message', 'User registered successfully');

//       const user = await Applicant.findOne({ email: 'applicant@example.com' });
//       expect(user).toBeTruthy();
//       expect(user?.dniCif).toBe('12345678A');
//     });

//     it('should register a new company', async () => {
//       const res = await request(app)
//         .post('/api/v1/register')
//         .send({
//           dniCif: '87654321B',
//           password: 'password123',
//           isCompany: true,
//           email: 'company@example.com'
//         });

//       expect(res.statusCode).toEqual(201);
//       expect(res.body).toHaveProperty('message', 'User registered successfully');

//       const user = await Company.findOne({ email: 'company@example.com' });
//       expect(user).toBeTruthy();
//       expect(user?.dniCif).toBe('87654321B');
//     });

//     it('should not register a user with an existing email', async () => {
//       // Crear un usuario existente primero
//       await request(app)
//         .post('/api/v1/register')
//         .send({
//           dniCif: '12345678A',
//           password: 'password123',
//           isCompany: false,
//           email: 'existing@example.com'
//         });

//       const res = await request(app)
//         .post('/api/v1/register')
//         .send({
//           dniCif: '87654321B',
//           password: 'password123',
//           isCompany: true,
//           email: 'existing@example.com'
//         });

//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toHaveProperty('message', 'User already exists');
//     });

//     it('should return 400 if required fields are missing', async () => {
//       const res = await request(app)
//         .post('/api/v1/register')
//         .send({
//           dniCif: '',
//           password: '',
//           isCompany: undefined,
//           email: ''
//         });

//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toHaveProperty('message', 'All fields are required');
//     });
//   });
// });
