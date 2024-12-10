const helper = require('../utils/helpers.js')
const otpRepository = require('../repositories/otpRepository.js')

/**
 * Store OTP in the database with an expiration time of 15 minutes
 * @param {string} email - The email address for which OTP is generated
 */
const generateOtp = async (email) => {
  try {
    if (!email) {
      return { success: false, message: 'Email is required' };
    }

    // Generate OTP and calculate expiration time
    const otp = helper.generateOTP();
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    const otpData = {
        otp: otp,
        expiration_time: expirationTime,
        email: email
      };

    // Save to the database
    await otpRepository.storeOtp(
        otpData
    )

    return {
      success: true,
      otp : otp,
      message: 'OTP generated and stored successfully',
    };
  } catch (error) {
    console.error('Error storing OTP:', error);
    return {
      success: false,
      message: 'Failed to store OTP',
    };
  }
};

/**
 * Validate OTP for a given email
 * @param {string} email - The email address
 * @param {string} otp - The OTP to validate
 */
const validateOTP = async (email, otp) => {
  try {
    if (!email || !otp) {
      return { success: false, message: 'Email and OTP are required' };
    }

    // Fetch OTP record for the email
    const otpRecord = await otpRepository.isValidOtp(
        email,
        otp
    )

    return otpRecord

  } catch (error) {
    console.error('Error validating OTP:', error);
    return {
      success: false,
      message: 'Failed to validate OTP',
    };
  }
};

module.exports = {
    generateOtp,
    validateOTP,
};
