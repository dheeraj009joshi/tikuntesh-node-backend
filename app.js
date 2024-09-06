const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(cors());
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/project', require('./routes/v1/projectRoutes'));
app.use('/api/v1/blog', require('./routes/v1/blogRoutes'));
app.use('/api/v1/user', require('./routes/v1/userRoutes'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;
