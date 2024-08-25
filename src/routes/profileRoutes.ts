import express from 'express';
import ProfileController from '../controllers/EditProfileController';
import authJWT from '../middlewares/authJWT'; 

const router = express.Router();
const profileController = new ProfileController();

// Protect the profile update route with Authjwt
router.put('/update', authJWT, (req, res, next) => profileController.updateProfile(req, res, next));

export default router;
