const express = require('express');
const router = express.Router();
const {
  signup,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  login,
} = require('../controllers/authController');

// Auth endpoints
router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/login', login);

module.exports = router;
