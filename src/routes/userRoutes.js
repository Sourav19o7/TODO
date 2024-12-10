const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/exists', userController.getUserByEmail);
router.post('/email/otp', userController.sendEmailOTP);
router.post('/email/otp/verify', userController.verifyEmailOTP);
router.post('/register', userController.registerUser);

module.exports = router;
