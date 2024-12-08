const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/exists', userController.getUserByEmail);
router.get('/email/otp', userController.sendEmailOTP);
router.get('/email/otp/verify', userController.verifyEmailOTP);
router.post('/register', userController.registerUser);

module.exports = router;
