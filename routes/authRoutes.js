import express from 'express';
import { register, login } from '../controller/authController.js';
import { userAuth } from '../middlewares/authMiddleware.js';
import { validateUser } from '../controller/authController.js';

const authRouter= express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get("/validate", userAuth, validateUser);

export default authRouter;