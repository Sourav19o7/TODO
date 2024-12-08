require('dotenv').config();
const userRepository = require('../repositories/userRepository');
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const retrieveUserByEmail = async (email) => {
  if (!email) {
    return null;
  }
  const user = await userRepository.getUserByEmail(email);
  return user;
};

const sendEmailOTP = async (email) => {
  resend.emails.send({
    from: 'sourav.dey0147@gmail.com',
    to: email,
    subject: 'Hello World',
    html: 'Hey Omkar'
  });
}

const verifyEmailOTP = async (email, otp) => {
  return false;
}

const saveUser = async (user) => {
  if (!user) {
    return null;
  }
  const newUser = await userRepository.saveUser(user);
  return newUser;
};

module.exports = {
  retrieveUserByEmail,
  sendEmailOTP,
  verifyEmailOTP,
  saveUser
};
