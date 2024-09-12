import multer, { StorageEngine } from 'multer';
import path from 'path';

// configure storing files to disk
const storage: StorageEngine = multer.diskStorage({
  destination: function (_req, file, callback) {
    if (file.mimetype.startsWith('logo/')) {
      const storagePath = path.join(__dirname, '..', 'public/logos');
      callback(null, storagePath);
    } else if (file.mimetype.startsWith('photo/')) {
      const storagePath = path.join(__dirname, '..', 'public/profile');
      callback(null, storagePath);
    } else if (file.mimetype === 'application/pdf') {
      const storagePath = path.join(__dirname, '..', 'uploads/cv');
      callback(null, storagePath);
    } else {
      callback(new Error('File not allowed'), '');
    }
  },
  filename: function (_req, file, callback) {
    try {
      const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
      callback(null, filename);
    } catch (error) {
      callback(error instanceof Error ? error : new Error('Unknown error'), '');
    }
  }
});

export default storage;
