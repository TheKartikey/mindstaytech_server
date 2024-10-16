const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

// Create a new post
router.post('/posts', postController.createPost);

// Get all posts
router.get('/posts', postController.getPosts);

// Get a specific post by ID
router.get('/posts/:id', postController.getPostById);

// Update a post
router.put('/posts/:id', postController.updatePost);

// Delete a post
router.delete('/posts/:id', postController.deletePost);

// Like a post
router.post('/posts/:id/like', postController.likePost);

// Add a comment to a post
router.post('/posts/:id/comment', postController.addComment);

module.exports = router;
