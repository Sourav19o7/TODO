const userRepository = require('../repositories/userRepository');

const retrieveUserByEmail = async (email) => {
  if (!email) {
    throw new Error('Email is required.');
  }

  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('User not found.');
  }

  return user;
};

module.exports = {
  retrieveUserByEmail,
};
