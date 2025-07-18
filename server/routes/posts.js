import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/postController.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all posts with pagination (public)
router.get('/', getPosts);

// Get single post by ID (public)
router.get('/:id', getPostById);

// Create post (protected)
router.post('/', verifyToken, createPost);

// Update post (protected)
router.put('/:id', verifyToken, updatePost);

// Delete post (protected)
router.delete('/:id', verifyToken, deletePost);
// Like/Unlike post (protected)
router.put('/:id/like', verifyToken, likePost);


export default router;
