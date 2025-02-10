const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// POST: Insert a new task
router.post('/save', taskController.createTask);
router.get('/get', taskController.getAllTasks);
router.get('/getById', taskController.getTaskById);
router.get('/completion', taskController.toggleTaskCompletion);
router.get('/plan', taskController.getPlan);

module.exports = router;
