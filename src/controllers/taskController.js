const taskService = require('../services/taskService');

/**
 * Controller for creating a new task.
 * Handles request validation and error responses.
 */
exports.createTask = async (req, res) => {
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
