const db = require('../config/db');

/**
 * Service for creating a new task in the database.
 * Handles business logic and database interactions.
 */
exports.createTask = async ({ title, description, isCompleted }) => {
  const query = `
    INSERT INTO tasks (title, description, isCompleted, createdAt, updatedAt)
    VALUES (?, ?, ?, NOW(), NOW())
  `;

  try {
    const [result] = await db.execute(query, [title, description, isCompleted]);
    return result.insertId; // Return the ID of the newly inserted task
  } catch (error) {
    console.error('Error in taskService.createTask:', error.message);
    throw new Error('Database Error: Unable to insert task');
  }
};
