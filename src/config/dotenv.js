const dotenv = require('dotenv');
const path = require('path');

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Validate required variables
const requiredVars = ['DATABASE', 'PASSWORD', 'NODE_ENV', 'DB_USERNAME', 'HOST'];
requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1); // Exit if a required variable is missing
  }
});

module.exports = {
  dbName: process.env.DATABASE,
  dbPassword: process.env.PASSWORD,
  dbUsername: process.env.DB_USERNAME,
  dbHost: process.env.HOST,
  nodeEnv: process.env.NODE_ENV,
};
