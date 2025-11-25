import express from 'express';
const router=express.Router();
import User from '../models/user.js';
import wrapAsync from '../utils/wrapAsync.js';
import passport from 'passport';
import { saveRedirectUrl } from '../middleware.js';
import userController from '../controllers/user.js';
router.get('/signup',userController.userSignup);
router.post('/signup',wrapAsync(userController.sighupPost));
router.get('/login',userController.loginPost);
router.post('/login',saveRedirectUrl,passport.authenticate('local',{
    failureFlash:true,
    failureRedirect:'/login'
}),userController.postUserLogin);
router.get('/logout',userController.logoutUser);
export default router;