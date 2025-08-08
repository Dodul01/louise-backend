import express from 'express';
import { AuthControllers } from './auth.controller';
import { VerifyEmailControllers } from '../VerifyEmail/verifyEmail.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/sign-in', AuthControllers.loginUser);
router.post('/send-otp', VerifyEmailControllers.sendOTP);
router.post('/verify-email', VerifyEmailControllers.verifyOTPController);
router.post('/forget-password', AuthControllers.forgetPassword);
router.post('/reset-password', auth("user","vendor", "admin"), AuthControllers.resetPassword);

export const AuthRouter = router;