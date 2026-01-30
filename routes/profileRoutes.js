import express from 'express'
import { getProfile, updateProfile } from '../controller/profileController.js';
import { userAuth } from '../middlewares/authMiddleware.js';

const profileRouter= express.Router();

profileRouter.get('/', userAuth, getProfile);
profileRouter.patch('/update', userAuth, updateProfile);

export default profileRouter;