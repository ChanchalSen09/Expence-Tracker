const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Nodemailer configuration for sending OTPs
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider's SMTP settings
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"Lalit Soni and Company" <${process.env.EMAIL_USER}>`, // Set a display name for the sender
        to: email,
        subject: 'Your OTP Code for Account Verification',
        text: `Hello,

Thank you for registering with us! To complete your account verification, please use the One-Time Password (OTP) below:

Your OTP Code: ${otp}

This code is valid for the next 10 minutes. If you did not request this code, please ignore this email or contact our support team.

Best regards,
Expense Support Team
`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Hello,</h2>
                <p>Thank you for registering with us! To complete your account verification, please use the One-Time Password (OTP) below:</p>
                <h3 style="color: #007bff;">Your OTP Code: ${otp}</h3>
                <p>This code is valid for the next 10 minutes. If you did not request this code, please ignore this email or contact our support team.</p>
                <br>
                <p>Best regards,</p>
                <p>Expense Support Team</p>
            </div>
        `,
    });
};


// Function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Controller for signing up a new user
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP and set expiry time (10 minutes from now)
        const otp = generateOTP();
        const otpExpiry = Date.now() + 10 * 60 * 1000;

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpiry,
        });

        // Save the user to the database
        await user.save();

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(201).json({ message: 'User created. Verify your email with the OTP sent to you.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for verifying OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ error: 'Invalid OTP or OTP expired.' });
        }

        // Mark user as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Account verified successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for logging in the user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !user.isVerified) {
            return res.status(400).json({ error: 'User not verified or does not exist.' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for resending OTP
exports.resendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        // Check if OTP is still valid
        if (user.otpExpiry && user.otpExpiry > Date.now()) {
            return res.status(400).json({ error: 'An OTP was recently sent. Please check your email.' });
        }

        // Generate new OTP and set new expiry time
        const otp = generateOTP();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Update user's OTP and expiry
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP resent. Please check your email.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
