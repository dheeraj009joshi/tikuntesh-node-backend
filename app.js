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
const allowedOrigins = ['https://tikunteck-web-git-main-marotis-projects.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowed origins list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Use the cors middleware with the configured options
app.use(cors(corsOptions));
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
