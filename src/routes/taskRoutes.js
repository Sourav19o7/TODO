const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// POST: Insert a new task
router.post('/', taskController.createTask);

module.exports = router;
