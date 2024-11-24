// Import the mysql2 library for database connection
const mysql = require('mysql2/promise');

// Import environment variables from dotenv configuration
const { dbName, dbPassword, dbUsername, dbHost, nodeEnv } = require('./dotenv');

// Create a MySQL connection pool for better scalability and performance
const connection = mysql.createPool({
  host: dbHost,                // Database host
  user: dbUsername,            // Database username
  password: dbPassword,        // Database password
  database: dbName,            // Database name
  waitForConnections: true,    // Wait for available connections if the pool is busy
  connectionLimit: 10,         // Maximum number of connections in the pool
  queueLimit: 0,               // No limit on queued connection requests
});

// Test the database connection
(async () => {
  try {
    const conn = await connection.getConnection(); // Get a connection from the pool
    console.log(`Connected to the database in ${nodeEnv} mode.`);
    conn.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
})();

// Export the connection pool to use in other parts of the application
module.exports = connection;
