const express = require('express');
const router = express.Router();
const Design = require('../models/Design');

router.get('/', async (req, res) => {
  try {
    const designs = await Design.find({ published: true }).sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design || !design.published) return res.status(404).json({ error: 'Design not found' });
    res.json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
