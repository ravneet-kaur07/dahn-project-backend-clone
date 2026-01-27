import express from 'express';
import { register, login } from '../controller/authController.js';
// import { userAuth } from '../middlewares/authMiddleware.js';

const authRouter= express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
// authRouter.get('/dash',userAuth, getDash)

export default authRouter;