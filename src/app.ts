import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import apiRoutes from './routes';

// Execute module to connect db
import './lib/connectMongoose';

const app = express();
const apiVersion = process.env.API_VERSION;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
