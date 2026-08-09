const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateOtp = require('../utils/generateOtp');
const { sendEmail } = require('../config/nodemailer');
const { getOtpEmailTemplate, getPasswordResetEmailTemplate } = require('../utils/emailTemplates');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'matrucare_ai_super_secret_jwt_key_2026', {
    expiresIn: '7d',
  });
};

// @desc    Register a new user & Send OTP
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are mandatory' });
    }

    if (fullName.trim().length < 3) {
      return res.status(400).json({ success: false, message: 'Full name must be at least 3 characters' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!process.env.MONGO_URI) {
      return res.status(500).json({ success: false, message: 'Database is not configured for this deployment.' });
    }

    let existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ success: false, message: 'User with this email already exists and is verified. Please log in.' });
    }

    if (existingUser && !existingUser.isVerified) {
      existingUser.fullName = fullName.trim();
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpiresAt = otpExpiresAt;
      await existingUser.save();
    } else {
      existingUser = await User.create({
        fullName: fullName.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        otp,
        otpExpiresAt,
        isVerified: false,
      });
    }

    // Try sending OTP email via Nodemailer
    let emailResult = { delivered: false };
    try {
      emailResult = await sendEmail({
        to: normalizedEmail,
        subject: 'MatruCare AI — 6-Digit OTP Email Verification Code',
        html: getOtpEmailTemplate(otp),
      });
    } catch (emailErr) {
      console.warn('[Signup Email Exception]:', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: emailResult.delivered
        ? 'Signup successful! Verification OTP sent to your email.'
        : 'Signup successful! Security verification code generated.',
      email: normalizedEmail,
      emailDelivered: emailResult.delivered,
      devOtpPreview: emailResult.delivered ? null : otp,
    });
  } catch (error) {
    console.error('[Signup Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during signup' });
  }
};

// @desc    Verify 6-Digit OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and 6-digit OTP are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Account is already verified. Please log in.' });
    }

    if (!user.otp || user.otp !== otp.toString().trim()) {
      return res.status(400).json({ success: false, message: 'Invalid 6-digit OTP code' });
    }

    if (new Date() > new Date(user.otpExpiresAt)) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Account successfully verified! You can now log in.',
    });
  } catch (error) {
    console.error('[Verify OTP Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during OTP verification' });
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Account is already verified. Please log in.' });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    let emailResult = { delivered: false };
    try {
      emailResult = await sendEmail({
        to: user.email,
        subject: 'MatruCare AI — New OTP Verification Code',
        html: getOtpEmailTemplate(otp),
      });
    } catch (emailErr) {
      console.warn('[Resend OTP Email Exception]: OTP:', otp);
    }

    return res.status(200).json({
      success: true,
      message: emailResult.delivered
        ? 'Fresh 6-digit OTP code sent to your email!'
        : 'Fresh 6-digit OTP code generated!',
      emailDelivered: emailResult.delivered,
      devOtpPreview: emailResult.delivered ? null : otp,
    });
  } catch (error) {
    console.error('[Resend OTP Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during OTP resend' });
  }
};

// @desc    Request Password Reset OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email address' });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    let emailResult = { delivered: false };
    try {
      emailResult = await sendEmail({
        to: user.email,
        subject: 'MatruCare AI — Password Reset Verification Code',
        html: getPasswordResetEmailTemplate(otp),
      });
    } catch (emailErr) {
      console.warn('[Forgot Password Email Exception]:', emailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: emailResult.delivered
        ? 'Password reset OTP code emailed successfully!'
        : 'Password reset security code generated!',
      email: normalizedEmail,
      emailDelivered: emailResult.delivered,
      devOtpPreview: emailResult.delivered ? null : otp,
    });
  } catch (error) {
    console.error('[Forgot Password Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during password reset request' });
  }
};

// @desc    Reset Password using OTP
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields (Email, OTP, New Password, Confirm Password) are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    if (!user.otp || user.otp !== otp.toString().trim()) {
      return res.status(400).json({ success: false, message: 'Invalid 6-digit security code' });
    }

    if (new Date() > new Date(user.otpExpiresAt)) {
      return res.status(400).json({ success: false, message: 'Security code has expired. Please request a new password reset.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.otp = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.',
    });
  } catch (error) {
    console.error('[Reset Password Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error resetting password' });
  }
};

// @desc    Authenticate User & Get JWT
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Account email is not verified. Please verify your OTP first.',
        needsVerification: true,
        email: user.email,
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

// @desc    Get Logged-In User Profile
// @route   GET /api/user/me
// @access  Private
const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error('[GetMe Error]:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching user profile' });
  }
};

// @desc    Update User Profile
// @route   PUT /api/user/update
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (fullName && fullName.trim().length >= 3) {
      user.fullName = fullName.trim();
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('[Update Profile Error]:', error);
    return res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
};

module.exports = {
  signup,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  login,
  getMe,
  updateProfile,
};
