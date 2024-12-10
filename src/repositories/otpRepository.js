const supabase = require('../config/supabaseClient');

const isValidOtp = async (email, otp) => {
    try {
      // Query the OTP table to find a matching OTP and email
      const { data, error } = await supabase
        .from('otp')
        .select('*')
        .eq('email', email)
        .eq('otp', otp)
        .single();
  
      // If no data is found or an error occurred
      if (error || !data) {
        return { valid: false, message: 'Invalid OTP or email' };
      }
  
      // Check if the OTP has expired
      const currentTime = new Date();
      const otpExpirationTime = new Date(data.expiration_time);
  
      if (otpExpirationTime <= currentTime) {
        return { valid: false, message: 'OTP has expired' };
      }
  
      return { valid: true, message: 'OTP is valid' };
    } catch (err) {
      console.error('Error validating OTP:', err);
      return { valid: false, message: 'An error occurred while validating OTP' };
    }
  };
  

const storeOtp = async (otpData) => {
  const { data } = await supabase
    .from('otp')
    .insert(otpData)
    .select();
    
  return data;
};

module.exports = {
    isValidOtp,
  storeOtp
};
