

import express from 'express'
import { forgotPassword, login, logout, refresh, register, resendOtp, resetPassword, verifyOTP } from './auth.controller.js';
import { otpLimiter,loginLimiter } from '../../shared/middleware/rateLimit.middleware.js';

const router = express.Router();

router.post('/register',otpLimiter,register);
router.post('/login',loginLimiter,login);
router.post("/refresh",refresh);
router.post('/logout',logout);

router.post("/verify-otp", loginLimiter,verifyOTP);
router.post("/resend-otp", otpLimiter, resendOtp);
router.post("/forgot-password",otpLimiter ,forgotPassword);
router.post("/reset-password",resetPassword);

export default router;