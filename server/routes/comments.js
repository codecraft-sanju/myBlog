import express from 'express';
import {
  addComment,
  getComments,
  deleteComment,
} from '../controllers/commentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get comments for a post (public)
router.get('/:postId', getComments);

// Add comment to a post (protected)
router.post('/:postId', verifyToken, addComment);

// Delete comment (protected)
router.delete('/:commentId', verifyToken, deleteComment);

export default router;
