const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS - Restrict in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json({ limit: '10kb' }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('CRITICAL: MongoDB connection error. Please check your MONGODB_URI in the .env file.');
    console.error('Error Details:', err.message);
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

// Auth routes - ONLY login, NOT open admin creation
const authController = require('./controllers/authController');
app.post('/api/auth/login', authController.login);

// Only listen when not running on Vercel (serverless)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection at:', err.stack || err);
});

module.exports = app;

