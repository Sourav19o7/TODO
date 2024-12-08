const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { v4: uuidv4 } = require('uuid');

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.authData;
    const user = await userService.retrieveUserByEmail(email);
    console.log(user);
    if (!user) {
      return successResponse(res, 0, "User not found");
    }
    return successResponse(res, 1, "User found", user);
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message, 404);
  }
};

const sendEmailOTP = async (req, res) => {
  try {
    const email = "";
    const otpSent = await userService.sendEmailOTP(email);
    if (!otpSent) {
      return successResponse(res, 0, "Not able to send OTP");
    }
    return successResponse(res, 1, "OTP sent successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message, 404);
  }
};

const verifyEmailOTP = async (req, res) => {
  try {
    const email = "";
    const otp = "";
    const verified = await userService.verifyEmailOTP(email, otp);
    if (!verified) {
      return successResponse(res, 0, "OTP not verified");
    }
    return successResponse(res, 1, "OTP verified successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message, 404);
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, version_code } = req.authData;
    const userId = uuidv4();

    const user = [{
      user_id : userId,
      full_name : name,
      email_address : email,
      phone_number : phone,
      is_email_verified : true,
      is_phone_verified : false,
      version_code : version_code,
    }];

    const newUser = await userService.saveUser(user);
    if (!newUser) {
      return successResponse(res, 0, "User not saved");
    }
    return successResponse(res, 1, "User saved successfully", newUser);
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message, 404);
  }
}

module.exports = {
  getUserByEmail, 
  sendEmailOTP,
  verifyEmailOTP,
  registerUser
};
