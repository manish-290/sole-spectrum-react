import express from 'express';
import { Login, Logout, Signup } from '../controller/authController.js';

const authRouter = express.Router();

//signup route
authRouter.route('/signup').post(Signup);

//login route
authRouter.route('/login').post(Login);

//logout route
authRouter.route('/logout').post(Logout);

export default authRouter;