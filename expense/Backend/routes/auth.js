const express = require('express');
const { signup, verifyOTP, login, resendOTP } = require('../controllers/authcontrollers');

const router = express.Router();

// Route for signing up a new user
router.post('/signup', signup);

// Route for verifying OTP
router.post('/verify-otp', verifyOTP);

// Route for logging in a user
router.post('/login', login);
router.post('/resend', resendOTP)
module.exports = router;
