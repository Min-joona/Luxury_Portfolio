const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('CRITICAL: MongoDB connection error. Please check your MONGODB_URI in the .env file.');
    console.error('Error Details:', err.message);
    // Do not exit the process, allow the server to start (even if DB functionality is limited)
  }
};

connectDB();

const db = mongoose.connection;
db.on('error', (err) => {
  if (err.message.includes('ENOTFOUND')) {
    console.warn('Warning: Database host not found. Are you connected to the internet and is the URI correct?');
  } else {
    console.error('Database connection error:', err);
  }
});

// Routes
app.use('/api/messages', require('./routes/messages'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/admin', require('./routes/admin'));

// Auth routes
const authController = require('./controllers/authController');
app.post('/api/auth/login', authController.login);
app.post('/api/auth/create-admin', authController.createAdmin); // Run once to create admin

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection at:', err.stack || err);
});

