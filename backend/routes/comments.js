const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

const router = express.Router();

// POST /comments/:blogId - Create a new comment
router.post('/:blogId', authMiddleware, async (req, res) => {
  const { content } = req.body;
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const comment = new Comment({ content, author: req.user._id, blog: req.params.blogId });
    await comment.save();

    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /comments/:blogId - Get comments for a specific blog
router.get('/:blogId', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate('author', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true } // Return the updated document
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /comments/:id - Delete a comment by ID (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Check if the logged-in user is the author of the comment
    if (comment.author.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
