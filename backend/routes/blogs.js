const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    // Increment views
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like a blog
router.post('/:slug/like', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.likes += 1;
    await blog.save();
    res.json({ likes: blog.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Share a blog
router.post('/:slug/share', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.shares += 1;
    await blog.save();
    res.json({ shares: blog.shares });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add comment to blog
router.post('/:slug/comment', async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.comments.push({ name, email, comment });
    await blog.save();
    res.json(blog.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for a blog
router.get('/:slug/comments', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed initial blogs (run once)
router.post('/seed', async (req, res) => {
  try {
    const blogs = [
      {
        slug: "building-scalable-react-applications",
        title: "Building Scalable React Applications",
        excerpt: "Learn the best practices for architecting large-scale React applications with proper state management and component composition.",
        content: "Full article content here...",
        category: "React",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
        readTime: "8 min read",
        date: new Date("2024-01-15")
      },
      // Add more blogs here...
    ];
    
    await Blog.insertMany(blogs);
    res.json({ message: 'Blogs seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
