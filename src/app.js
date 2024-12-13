require('dotenv').config();
const verifyToken = require('./middleware/authMiddleware');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const color = require('colors');

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

color.setTheme({
  info: "green",
  warn: "yellow",
  db: "bgYellow",
  error: "bgRed",
  debug: "blue",
  connected: "bgCyan",
});

app.use(verifyToken)
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
