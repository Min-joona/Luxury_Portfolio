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

router.get('/:slug', async (req, res) => {
  try {
    const design = await Design.findOne({ slug: req.params.slug, published: true });
    if (design) return res.json(design);
    const byId = await Design.findById(req.params.slug);
    if (byId && byId.published) return res.json(byId);
    res.status(404).json({ error: 'Design not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
