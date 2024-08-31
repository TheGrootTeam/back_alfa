import express from 'express';
import EditProfileController from '../controllers/EditProfileController';
import ProfileController from '../controllers/ProfileController';


const profileRoutes = express.Router();
const editprofileController = new EditProfileController();
const profileController = new ProfileController();

profileRoutes.get('/:applicantOrCompany/:userId', profileController.index);
profileRoutes.put('/update', (req, res, next) => editprofileController.updateProfile(req, res, next));

export default profileRoutes;
