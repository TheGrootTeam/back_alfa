import express from 'express';
import ProfileController from '../controllers/EditProfileController';


const router = express.Router();
const profileController = new ProfileController();

router.put('/update', (req, res, next) => profileController.updateProfile(req, res, next));

export default router;
