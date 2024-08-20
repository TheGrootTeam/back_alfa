import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import apiRoutes from './routes';
import { swaggerOptions } from './swagger.config';
import cors from 'cors';

// Execute module to connect db
import './lib/connectMongoose';

const app = express();
const apiVersion = process.env.API_VERSION;
const allowedOrigins = ['http://localhost:3000', 'https://internit.tech/', 'http://internit.tech/'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (como las de curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Añadir más encabezados si es necesario
    credentials: true, // Si necesitas enviar cookies o autenticación
    preflightContinue: false, // Esto asegurará que no haya respuestas automáticas de preflight
    optionsSuccessStatus: 204 // Algunos navegadores (Safari) no aceptan el código de estado 204 en respuestas preflight
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger Configuration
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(`/api/${apiVersion}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//---------------------- API routes ---------------------------
app.use(`/api/${apiVersion}`, apiRoutes);

// ----------- catch 404 and forward to error handler -----------
app.use(function (_req, _res, next) {
  next(createError(404));
});

// ------------------------ Error handler -----------------------
app.use(function (err: HttpError, req: Request, res: Response, _next: NextFunction): void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

export default app;
