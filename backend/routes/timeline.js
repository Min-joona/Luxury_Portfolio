const express = require('express');
const router = express.Router();
const Timeline = require('../models/Timeline');
const { verifyToken } = require('../controllers/authController');

router.get('/', async (req, res) => {
  try {
    const items = await Timeline.find().sort({ sortOrder: 1, year: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/admin', verifyToken, async (req, res) => {
  try {
    const items = await Timeline.find().sort({ sortOrder: 1, year: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const item = new Timeline(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const item = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Timeline item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const item = await Timeline.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Timeline item not found' });
    res.json({ message: 'Timeline item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
