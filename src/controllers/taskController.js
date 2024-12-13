const taskService = require('../services/taskService');

/**
 * Controller for creating a new task.
 * Handles request validation and error responses.
 */
const createTask = async (req, res) => {
  const { title, description, isCompleted } = req.body;

  // Validate the input
  if (!title || typeof isCompleted === 'undefined') {
    return res.status(400).json({
      error: 'Validation Error: "title" and "isCompleted" fields are required.',
    });
  }

  try {
    // Call the service layer to insert the task
    const taskId = await taskService.createTask({ title, description, isCompleted });
    res.status(201).json({ message: 'Task created successfully', taskId });
  } catch (error) {
    console.error('Error in createTask:', error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const {user_id} = req.authData;
    const tasks = await taskService.getAllTasks(user_id);
    res.status(200).json({id : 1, message : "Tasks Fetched", data : tasks});
  } catch (error) {
    console.error('Error in getAllTasks:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

module.exports = {
  createTask,
  getAllTasks,
};