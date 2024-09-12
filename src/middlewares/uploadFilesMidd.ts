import multer from 'multer';
import storage from './uploadConfig';

const upload = multer({ storage: storage });

export function uploadFilesMiddleware(applicantOrCompany: string) {
  if (applicantOrCompany === 'applicant') {
    return upload.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'cv', maxCount: 1 } 
    ]);
  } else if (applicantOrCompany === 'company') {
    return upload.fields([
      { name: 'logo', maxCount: 1 }
    ]);
  } else {
    throw new Error('Unknown user type in upload files');
  }
}
