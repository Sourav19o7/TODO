

// taskRepository.js
const supabase = require('../config/supabaseClient');

/**
 * Saves a new task to the database.
 * @param {Object} task - The task object to save.
 * @returns {Object} - The newly created task object.
 */
const saveTask = async (task) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

/**
 * Fetches all tasks from the database.
 * @returns {Array} - An array of task objects.
 */
const getAllTasks = async (user_id) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user_id)
    .order('timeline', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Fetches a task by its ID from the database.
 * @param {string} id - The ID of the task.
 * @returns {Object|null} - The task object if found, otherwise null.
 */
const getTaskById = async (id) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Updates a task by its ID.
 * @param {string} id - The ID of the task to update.
 * @param {Object} updates - The updates to apply to the task.
 * @returns {Object} - The updated task object.
 */
const updateTask = async (id, updates) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

/**
 * Deletes a task by its ID.
 * @param {string} id - The ID of the task to delete.
 * @returns {boolean} - True if the task was successfully deleted, otherwise false.
 */
const deleteTask = async (id) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

module.exports = {
  saveTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
