import { Response, NextFunction } from 'express';
import multer, { MulterError, StorageEngine } from 'multer';
import path from 'path';
import createError from 'http-errors';
import { CustomRequest } from '../interfaces/IauthJWT';
import fs from 'fs';

const storage: StorageEngine = multer.diskStorage({
  //configure folder to store files and filter allowed formats
  destination: function (req, file, callback) {
    let applicantOrCompany = req.params.applicantOrCompany;
    if (!applicantOrCompany) {
      applicantOrCompany = req.body.isCompany ? 'company' : 'applicant';
    }
    if (applicantOrCompany === 'applicant') {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        const storagePath = path.resolve(`${process.env.LOGO_PATH}/photo`);
        if (!fs.existsSync(storagePath)) {
          fs.mkdirSync(storagePath, { recursive: true });
        }
        callback(null, storagePath);
      } else if (file.mimetype === 'application/pdf') {
        const storagePath = path.resolve(`${process.env.LOGO_PATH}/cv`);
        if (!fs.existsSync(storagePath)) {
          fs.mkdirSync(storagePath, { recursive: true });
        }
        callback(null, storagePath);
      } else {
        callback(createError(400, 'File format not allowed'), '');
      }
    } else if (applicantOrCompany === 'company') {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        const storagePath = path.resolve(`${process.env.LOGO_PATH}/logo`);
        if (!fs.existsSync(storagePath)) {
          fs.mkdirSync(storagePath, { recursive: true });
        }
        callback(null, storagePath);
      } else {
        callback(createError(400, 'File format not allowed'), '');
      }
    } else {
      callback(createError(400, 'Unknown user type in upload files'), '');
    }
  },
  //configure file name
  filename: function (_req, file, callback) {
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (_req, file, callback) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'application/pdf'
    ) {
      callback(null, true);
    } else {
      callback(createError(400, 'Invalid file type. Only JPEG, JPG, PNG, and PDF files are allowed.'));
    }
  }
});

const uploadMiddleware = (req: CustomRequest, _res: Response, next: NextFunction) => {
  const fields = [
    { name: 'photo', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ];
  upload.fields(fields)(req, _res, (err) => {
    if (err instanceof MulterError) {
      next(createError(400, `${err.message}`));
      return;
    } else {
      next();
    }
  });
};

export default uploadMiddleware;
