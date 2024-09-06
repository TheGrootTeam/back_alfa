import express from 'express';
import ProfileController from '../controllers/ProfileController';


const profileRoutes = express.Router();
const profileController = new ProfileController();

profileRoutes.get('/:applicantOrCompany/:userId', profileController.index);

export default profileRoutes;
