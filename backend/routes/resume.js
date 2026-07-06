const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { verifyToken } = require('../controllers/authController');
const resumeData = require('../data/resumeData');

// Public: the résumé content
router.get('/', async (_req, res) => {
  try {
    const resume = await Resume.findOne();
    res.json(resume || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: read (same doc, but behind auth for the editor)
router.get('/admin', verifyToken, async (_req, res) => {
  try {
    const resume = await Resume.findOne();
    res.json(resume || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: create or update the single résumé document
router.put('/', verifyToken, async (req, res) => {
  try {
    const payload = req.body;
    delete payload._id;
    let resume = await Resume.findOne();
    if (resume) {
      resume.set(payload);
      await resume.save();
    } else {
      resume = await Resume.create(payload);
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// One-time additive seed (guarded) — only fills in if no résumé exists.
router.post('/seed', async (req, res) => {
  if (!process.env.SEED_TOKEN || req.headers['x-seed-token'] !== process.env.SEED_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const existing = await Resume.findOne();
    if (existing) return res.json({ message: 'Résumé already exists', seeded: false });
    const resume = await Resume.create(resumeData);
    res.json({ message: 'Résumé seeded', seeded: true, id: resume._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
