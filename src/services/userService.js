require('dotenv').config();
const userRepository = require('../repositories/userRepository');
const emailService = require('./emailService');
const otpService = require('./otpService')

/**
 * Retrieves a user by their email.
 * @param {string} email - The user's email address.
 * @returns {Object|null} - The user object if found, otherwise null.
 */
const retrieveUserByEmail = async (email) => {
  if (!email) {
    throw new Error('Email is required');
  }
  return await userRepository.getUserByEmail(email);
};

/**
 * Sends an OTP to the user's email.
 * @param {string} email - The recipient's email address.
 * @returns {Object} - The response from the email service.
 */
const sendEmailOTP = async (email, otp) => {
  if (!email) {
    throw new Error('Email is required for sending OTP');
  }

  if (!otp){
    throw new Error("Unable to generate OTP")
  }
  
  try {

    const response = await emailService.sendMail(email, otp);
    console.log('Email sent response:', response);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Error sending email OTP:', error.message);
    throw new Error('Failed to send OTP. Please try again later.');
  }
};

/**
 * Verifies the OTP sent to the user's email.
 * @param {string} email - The user's email address.
 * @param {string} otp - The OTP to verify.
 * @returns {boolean} - True if OTP is verified, otherwise false.
 */
const verifyEmailOTP = async (email, otp) => {
  if (!email || !otp) {
    throw new Error('Email and OTP are required for verification');
  }

  // Placeholder logic for OTP verification. Replace with actual validation logic.
  const isValidOTP = otpService.validateOTP(email, otp)
  
  return isValidOTP;
};

/**
 * Saves a new user in the database.
 * @param {Object} user - The user object to save.
 * @returns {Object|null} - The newly created user object, or null on failure.
 */
const saveUser = async (user) => {
  if (!user || !user.email) {
    throw new Error('Valid user data is required');
  }

  try {
    return await userRepository.saveUser(user);
  } catch (error) {
    console.error('Error saving user:', error.message);
    throw new Error('Failed to save user. Please try again later.');
  }
};


module.exports = {
  retrieveUserByEmail,
  sendEmailOTP,
  verifyEmailOTP,
  saveUser,
};
