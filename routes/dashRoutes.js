import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { rbacMiddleware } from '../middlewares/rbacMiddleware.js';
import { changePass, getDash, settings, staff, subscription, suggestions } from '../controller/dashController.js';

const dashRouter= express.Router();

dashRouter.get('/', userAuth, getDash);
dashRouter.get('/suggestions', userAuth, rbacMiddleware("view_suggestions"), suggestions);
dashRouter.get('/settings', userAuth, rbacMiddleware("settings"), settings);
dashRouter.post('/change-password', userAuth, rbacMiddleware("change_password"), changePass);
dashRouter.get('/manage-staff', userAuth, rbacMiddleware("manage_staff"), staff);
dashRouter.get('/subscription', userAuth, rbacMiddleware("manage_subscription"), subscription);

export default dashRouter;