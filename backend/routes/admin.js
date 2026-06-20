const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Message = require('../models/Message');
const { verifyToken } = require('../controllers/authController');

// Get all blogs (admin view with stats)
router.get('/blogs', verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new blog
router.post('/blogs', verifyToken, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update blog
router.put('/blogs/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete blog
router.delete('/blogs/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all contact messages
router.get('/messages', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete message
router.delete('/messages/:id', verifyToken, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics dashboard data
router.get('/analytics', verifyToken, async (req, res) => {
  try {
    // Get blog stats
    const totalBlogs = await Blog.countDocuments();
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const totalLikes = await Blog.aggregate([
      { $group: { _id: null, total: { $sum: '$likes' } } }
    ]);
    const totalShares = await Blog.aggregate([
      { $group: { _id: null, total: { $sum: '$shares' } } }
    ]);
    
    // Get message stats
    const totalMessages = await Message.countDocuments();
    
    // Get top performing blogs
    const topBlogs = await Blog.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title views likes shares');
    
    // Get recent activity (last 7 days)
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentViews = await Blog.aggregate([
      { $match: { date: { $gte: lastWeek } } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    
    res.json({
      stats: {
        totalBlogs,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0,
        totalShares: totalShares[0]?.total || 0,
        totalMessages,
        recentViews: recentViews[0]?.total || 0
      },
      topBlogs,
      lastUpdated: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
