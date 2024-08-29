import express from 'express';
import EditProfileController from '../controllers/EditProfileController';
import ProfileController from '../controllers/ProfileController';


const profileRoutes = express.Router();
const editprofileController = new EditProfileController();

profileRoutes.get('/:applicantOrCompany/:id', ProfileController.index);
profileRoutes.put('/update', (req, res, next) => editprofileController.updateProfile(req, res, next));

export default profileRoutes;
