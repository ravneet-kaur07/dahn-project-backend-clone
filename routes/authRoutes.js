import express from 'express';
import { register, login } from '../controller/authController.js';
import { userAuth } from '../middlewares/authMiddleware.js';
// import { rbacMiddleware } from '../middlewares/rbacMiddleware.js';

const authRouter= express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get("/validate", userAuth, (req, res)=>{
    res.json({
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
    })
})
// authRouter.get('/dash',userAuth, getDash);
// authRouter.get('/staff',userAuth, rbacMiddleware("agency"), getStaff);

export default authRouter;