import express from 'express';
import { AuthControllers } from './auth.controller';
import { VerifyEmailControllers } from '../VerifyEmail/verifyEmail.controller';

const router = express.Router();

router.post('/sign-in', AuthControllers.loginUser);
router.post('/send-otp', VerifyEmailControllers.sendOTP);
router.post('/verify-email', VerifyEmailControllers.verifyOTPController);
router.post('/forget-password', AuthControllers.forgetPassword);

export const AuthRouter = router;