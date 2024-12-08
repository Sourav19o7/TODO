const crypto = require('crypto');

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

const isOTPExpired = (otpTimestamp) => {
    const expiryTime = parseInt(process.env.OTP_EXPIRY_MINUTES) || 5;
    const currentTime = new Date().getTime();
    return currentTime - otpTimestamp > expiryTime * 60 * 1000; // Convert to milliseconds
};

module.exports = { generateOTP, isOTPExpired };
