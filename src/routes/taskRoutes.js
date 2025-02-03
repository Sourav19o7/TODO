const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// POST: Insert a new task
router.post('/save', taskController.createTask);
router.get('/get', taskController.getAllTasks);
router.get('/completion', taskController.toggleTaskCompletion);

module.exports = router;
