const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://dlovej009:Dheeraj009@cluster0.zo1ek.mongodb.net/Data?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,  // Use TLS/SSL
      tlsAllowInvalidCertificates: true,  // If using a self-signed certificate
    });


    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

