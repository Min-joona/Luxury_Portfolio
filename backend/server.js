const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use(helmet({ contentSecurityPolicy: false }));

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
app.use(express.json({ limit: '10mb' }));

const stripOperators = (obj) => {
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) delete obj[key];
    else stripOperators(obj[key]);
  }
};
app.use((req, _res, next) => { stripOperators(req.body); next(); });

app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }));
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later.' },
});

// Cache the connection across serverless invocations so a cold start
// awaits an in-flight connect instead of querying a not-yet-open socket.
let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
      .then((m) => { console.log('Connected to MongoDB'); return m; });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

// Ensure the DB is connected before any /api route runs (serverless-safe).
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    // Let the connection retry on the next request instead of caching a failure.
    cached.promise = null;
    res.status(503).json({ error: 'Database temporarily unavailable, please retry.' });
  }
});

app.use('/api/messages', require('./routes/messages'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/designs', require('./routes/designs'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/timeline', require('./routes/timeline'));

const PageView = require('./models/PageView');
app.post('/api/track', async (req, res) => {
  try {
    await PageView.create({ path: req.body.path || '/', referrer: req.body.referrer || '', userAgent: req.headers['user-agent'] || '' });
    res.json({ ok: true });
  } catch { res.json({ ok: true }); }
});

const authController = require('./controllers/authController');
app.post('/api/auth/login', authLimiter, authController.login);

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

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection at:', err.stack || err);
});

module.exports = app;
