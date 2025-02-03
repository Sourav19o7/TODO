const taskService = require('../services/taskService');

/**
 * Controller for creating a new task.
 * Handles request validation and error responses.
 */
const createTask = async (req, res) => {
  const { user_id, title, description, timeline, assignee, completed = false } = req.authData;

  console.log("Auth Data", req.authData);

  // Validate the input
  if (!title || typeof completed === 'undefined') {
    return res.status(400).json({
      error: 'Validation Error: "title" and "isCompleted" fields are required.',
    });
  }

  try {
    // Call the service layer to insert the task
    const taskId = await taskService.createTask({ user_id, title, description, timeline, assignee, completed });
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

const toggleTaskCompletion = async (req, res) => {
  const { taskId } = req.authData;

  if (!taskId) {
    return res.status(400).json({
      error: 'Validation Error: "taskId" is required.',
    });
  }

  try {
    const updatedTask = await taskService.toggleTaskCompletion(taskId);
    res.status(200).json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    console.error('Error in toggleTaskCompletion:', error.message);
    res.status(500).json({ error: 'Failed to update task' });
  }
}

const getPlan = async (req, res) => {
  try {
    const {user_id, problem, timeline} = req.authData;

    if (!problem || !timeline) {
      return res.status(400).json({ error: "Problem and deadline are required" });
    }

    const plan = await taskService.getPlan(user_id, problem, timeline);
    
    res.status(200).json({id : 1, message : "Plan Fetched", data : plan});
  } catch (error) {
    console.error('Error in getPlan:', error.message);
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  toggleTaskCompletion,
  getPlan
};