const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);

// Security headers (JSON API — CSP handled by the frontend host)
app.use(helmet({ contentSecurityPolicy: false }));

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

// Strip Mongo operators ($, .) from user-supplied body keys.
// (express-mongo-sanitize is not Express 5 compatible, so this is done inline.)
const stripOperators = (obj) => {
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) delete obj[key];
    else stripOperators(obj[key]);
  }
};
app.use((req, _res, next) => { stripOperators(req.body); next(); });

// Rate limiting — generous globally, strict on login to blunt brute force
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }));
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later.' },
});

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
app.post('/api/auth/login', authLimiter, authController.login);

// One-time cloud seed (blogs + admin bootstrap), guarded by a shared secret.
app.post('/api/seed', async (req, res) => {
  if (!process.env.SEED_TOKEN || req.headers['x-seed-token'] !== process.env.SEED_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const result = await require('./seedRunner')();
    res.json({ message: 'Seed complete', ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
