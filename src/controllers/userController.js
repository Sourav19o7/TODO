const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { v4: uuidv4 } = require('uuid');
const otpService = require('../services/otpService.js')

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.authData;

    if (!email) {
      return successResponse(res, 0, "Email is required");
    }

    const user = await userService.retrieveUserByEmail(email);

    if (!user) {
      return successResponse(res, 0, "User not found");
    }

    return successResponse(res, 1, "User found", user);
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return errorResponse(res, "Unable to fetch user", 500);
  }
};

const sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.authData;

    if (!email) {
      return successResponse(res, 0, "Email is required");
    }

    
    const otp = await otpService.generateOtp(email)

    if (!otp.success) {
      return successResponse(res, 0, "Failed to generate OTP");
    }

    const otpSent = await userService.sendEmailOTP(email, otp.otp);

    if (!otpSent) {
      return successResponse(res, 0, "Failed to send OTP");
    }

    return successResponse(res, 1, "OTP sent successfully");
  } catch (error) {
    console.error("Error in sendEmailOTP:", error);
    return errorResponse(res, "Unable to send OTP", 500);
  }
};

const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.authData;

    if (!email || !otp) {
      return successResponse(res, 0, "Email and OTP are required");
    }

    const verified = userService.verifyEmailOTP(email, otp);

    if (!verified.valid) {
      return successResponse(res, 0, verified.message);
    }

    return successResponse(res, 1, verified.message);
  } catch (error) {
    console.error("Error in verifyEmailOTP:", error);
    return errorResponse(res, "Unable to verify OTP", 500);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, version_code } = req.authData;

    if (!name || !email || !phone || !version_code) {
      return successResponse(res, 0, "All fields are required");
    }

    const userId = uuidv4();

    const user = {
      user_id: userId,
      full_name: name,
      email_address: email,
      phone_number: phone,
      is_email_verified: true,
      is_phone_verified: false,
      version_code: version_code,
    };

    const newUser = await userService.saveUser(user);

    if (!newUser) {
      return successResponse(res, 0, "Failed to register user");
    }

    return successResponse(res, 1, "User registered successfully", newUser);
  } catch (error) {
    console.error("Error in registerUser:", error);
    return errorResponse(res, "Unable to register user", 500);
  }
};

module.exports = {
  getUserByEmail,
  sendEmailOTP,
  verifyEmailOTP,
  registerUser,
};
