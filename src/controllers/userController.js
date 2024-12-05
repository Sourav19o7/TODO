const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.retrieveUserByEmail(email);
    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};

module.exports = {
  getUserByEmail,
};
