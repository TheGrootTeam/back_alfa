import { Response, NextFunction } from 'express';
import multer, { MulterError, StorageEngine } from 'multer';
import path from 'path';
import createError from 'http-errors';
import { CustomRequest } from '../interfaces/IauthJWT';

const storage: StorageEngine = multer.diskStorage({
  //configure folder to store files and filter allowed formats
  destination: function (req, file, callback) {
    const applicantOrCompany = req.params.applicantOrCompany;
    if (applicantOrCompany === 'applicant') {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        const storagePath = path.join(__dirname, '..', 'public', 'photo');
        callback(null, storagePath);
      } else if (file.mimetype === 'application/pdf') {
        const storagePath = path.join(__dirname, '..', 'uploads', 'cv');
        callback(null, storagePath);
      } else {
        callback(createError(400, 'File format not allowed'), '');
      }
    } else if (applicantOrCompany === 'company') {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        const storagePath = path.join(__dirname, '..', 'public', 'logo');
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
      callback(null, true);
    } else {
      callback(createError(400, 'Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
    }
  }
});

const uploadMiddleware = (req: CustomRequest, _res: Response, next: NextFunction) => {
  const fields = [
    { name: 'photo', maxCount: 1 },
    { name: 'cv', maxCount: 1 }
  ];

  upload.fields(fields)(req, _res, (err) =>  {
    if (err instanceof MulterError) {
      next(createError(400, `${err.message}`));
      return;
    } else {
      next();
    }
  });
};

export default uploadMiddleware;
