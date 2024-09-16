const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');
const serverLessHttp= require("serverless-http")

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the database
connectDB();

const app = express();

// Body parser
app.use(express.json());
// const allowedOrigins = ['https://tikunteck-web-git-main-marotis-projects.vercel.app'];

const corsOptions = {
  origin: 'https://tikunteck-web-git-main-marotis-projects.vercel.app', // Replace with your front-end URL
  methods: ['GET', 'POST'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors());
// Dev logging 
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// netlify Mount routers
// app.get("/.netlify/functions/api",(req,res)=>{
// return res.json({"message":"this is message "})
// })
// app.use('/.netlify/functions/api/v1/project', require('./routes/v1/projectRoutes'));
// app.use('/.netlify/functions/api/v1/blog', require('./routes/v1/blogRoutes'));
// app.use('/.netlify/functions/api/v1/user', require('./routes/v1/userRoutes'));

app.route("/").get((req,res)=>{
res.send({success:true})
})
// normal  routers
app.use('/api/v1/project', require('./routes/v1/projectRoutes'));
app.use('/api/v1/blog', require('./routes/v1/blogRoutes'));
app.use('/api/v1/user', require('./routes/v1/userRoutes'));

// Error handling middleware
app.use(errorHandler);

const handler =serverLessHttp(app)
module.exports.handler= async(event , context)=>{
  const result = await(event,context);
  return result
}


module.exports=app
