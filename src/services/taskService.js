// taskService.js
const taskRepository = require('../repositories/taskRepository');

/**
 * Service for creating a new task in the database.
 * Handles business logic and database interactions.
 * @param {Object} task - The task object containing title, description, and isCompleted status.
 * @returns {Object} - The newly created task.
 */
const createTask = async (task) => {
  if (!task || !task.title) {
    throw new Error('Task title is required');
  }

  try {
    const newTask = await taskRepository.saveTask(task);
    return newTask;
  } catch (error) {
    console.error('Error in taskService.createTask:', error.message);
    throw new Error('Failed to create task. Please try again later.');
  }
};

/**
 * Service for fetching all tasks from the database.
 * @returns {Array} - An array of task objects.
 */
const getAllTasks = async (user_id) => {
  try {
    console.log('Fetching all tasks...');
    const tasks = await taskRepository.getAllTasks(user_id);
    return tasks;
  } catch (error) {
    console.error('Error in taskService.getAllTasks:', error.message);
    throw new Error('Failed to retrieve tasks. Please try again later.');
  }
};

/**
 * Service for fetching a task by ID.
 * @param {string} id - The ID of the task.
 * @returns {Object|null} - The task object if found, otherwise null.
 */
const getTaskById = async (id) => {
  if (!id) {
    throw new Error('Task ID is required');
  }

  try {
    const task = await taskRepository.getTaskById(id);
    return task;
  } catch (error) {
    console.error('Error in taskService.getTaskById:', error.message);
    throw new Error('Failed to retrieve task. Please try again later.');
  }
};

/**
 * Service for updating a task by ID.
 * @param {string} id - The ID of the task to update.
 * @param {Object} updates - The updates to apply to the task.
 * @returns {Object} - The updated task object.
 */
const updateTask = async (id, updates) => {
  if (!id || !updates) {
    throw new Error('Task ID and updates are required');
  }

  try {
    const updatedTask = await taskRepository.updateTask(id, updates);
    return updatedTask;
  } catch (error) {
    console.error('Error in taskService.updateTask:', error.message);
    throw new Error('Failed to update task. Please try again later.');
  }
};

/**
 * Service for deleting a task by ID.
 * @param {string} id - The ID of the task to delete.
 * @returns {boolean} - True if the task was successfully deleted, otherwise false.
 */
const deleteTask = async (id) => {
  if (!id) {
    throw new Error('Task ID is required');
  }

  try {
    const success = await taskRepository.deleteTask(id);
    return success;
  } catch (error) {
    console.error('Error in taskService.deleteTask:', error.message);
    throw new Error('Failed to delete task. Please try again later.');
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};