const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Message = require('../models/Message');
const Project = require('../models/Project');
const Design = require('../models/Design');
const Setting = require('../models/Setting');
const PageView = require('../models/PageView');
const { verifyToken } = require('../controllers/authController');
const { uploadImage, uploadVideo, deleteImage } = require('../utils/cloudinary');

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ─── Upload Image ───────────────────────────────────────────────────
router.post('/upload', verifyToken, async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'No image data' });
    const result = await uploadImage(image);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Upload Video ───────────────────────────────────────────────────
router.post('/upload-video', verifyToken, async (req, res) => {
  try {
    const { video } = req.body;
    if (!video) return res.status(400).json({ error: 'No video data' });
    const result = await uploadVideo(video);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── BLOGS ──────────────────────────────────────────────────────────
router.get('/blogs', verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/blogs', verifyToken, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/blogs/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/blogs/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── PROJECTS ───────────────────────────────────────────────────────
router.get('/projects', verifyToken, async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/projects', verifyToken, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/projects/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/projects/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── DESIGNS ────────────────────────────────────────────────────────
router.get('/designs', verifyToken, async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/designs', verifyToken, async (req, res) => {
  try {
    const data = { ...req.body, slug: slugify(req.body.title) };
    const design = new Design(data);
    await design.save();
    res.status(201).json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/designs/:id', verifyToken, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.title) data.slug = slugify(data.title);
    const design = await Design.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!design) return res.status(404).json({ error: 'Design not found' });
    res.json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/designs/:id', verifyToken, async (req, res) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) return res.status(404).json({ error: 'Design not found' });
    res.json({ message: 'Design deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── SETTINGS (Profile) ─────────────────────────────────────────────
router.get('/settings', verifyToken, async (req, res) => {
  try {
    const settings = await Setting.find();
    const map = {};
    settings.forEach(s => { map[s.key] = s.value; });
    res.json(map);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/settings', verifyToken, async (req, res) => {
  try {
    const updates = req.body;
    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: { filter: { key }, update: { $set: { value } }, upsert: true }
    }));
    await Setting.bulkWrite(ops);
    res.json({ message: 'Settings updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── MESSAGES ───────────────────────────────────────────────────────
router.get('/messages', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/messages/:id', verifyToken, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── ANALYTICS ──────────────────────────────────────────────────────
router.get('/analytics', verifyToken, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalDesigns = await Design.countDocuments();
    const totalMessages = await Message.countDocuments();
    const totalViews = (await Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]))[0]?.total || 0;
    const totalLikes = (await Blog.aggregate([{ $group: { _id: null, total: { $sum: '$likes' } } }]))[0]?.total || 0;
    const totalShares = (await Blog.aggregate([{ $group: { _id: null, total: { $sum: '$shares' } } }]))[0]?.total || 0;
    const totalComments = (await Blog.aggregate([{ $group: { _id: null, total: { $sum: { $size: '$comments' } } } }]))[0]?.total || 0;
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentViews = (await Blog.aggregate([{ $match: { date: { $gte: lastWeek } } }, { $group: { _id: null, total: { $sum: '$views' } } }]))[0]?.total || 0;

    const topBlogs = await Blog.find().sort({ views: -1 }).limit(5).select('title views likes shares comments');

    const categoryBreakdown = await Blog.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, views: { $sum: '$views' }, likes: { $sum: '$likes' } } },
      { $sort: { count: -1 } }
    ]);

    const viewsOverTime = await Blog.aggregate([
      { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          views: { $sum: '$views' },
          likes: { $sum: '$likes' }
      }},
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]);

    const recentMessages = await Message.find().sort({ date: -1 }).limit(5).select('name email message date');

    const pageViews = await PageView.aggregate([
      { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 }
      }},
      { $sort: { _id: -1 } },
      { $limit: 30 }
    ]);

    res.json({
      stats: { totalBlogs, totalProjects, totalDesigns, totalMessages, totalViews, totalLikes, totalShares, totalComments, recentViews },
      topBlogs,
      categoryBreakdown: categoryBreakdown.map(c => ({ name: c._id, count: c.count, views: c.views, likes: c.likes })),
      viewsOverTime: viewsOverTime.map(v => ({ date: v._id, views: v.views, likes: v.likes })),
      pageViews: pageViews.map(p => ({ date: p._id, count: p.count })),
      recentMessages,
      lastUpdated: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
