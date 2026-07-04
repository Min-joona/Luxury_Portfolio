const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { notifyBlogLike, notifyBlogComment } = require('../utils/email');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:slug/like', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    blog.likes += 1;
    await blog.save();
    notifyBlogLike(blog.title, blog.slug);
    res.json({ likes: blog.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:slug/share', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    blog.shares += 1;
    await blog.save();
    res.json({ shares: blog.shares });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:slug/comment', async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    if (!name || !comment) return res.status(400).json({ error: 'Name and comment required' });
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    blog.comments.push({ name, email: email || '', comment });
    await blog.save();
    notifyBlogComment(blog.title, blog.slug, { name, comment });
    res.json(blog.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug/comments', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
