const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const Blog = require('../models/Blog');

const router = express.Router();

// 🔧 Create a new blog
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content, author: req.user._id });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📃 Get all blogs with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📝 Get a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✏️ Update a blog
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, content } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❌ Delete a blog
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Use findByIdAndDelete to remove the blog
    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
