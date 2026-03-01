import express from 'express';
import { authenticate } from '../../utils/auth.middleware.js';
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from './comments.controller.js';

const router = express.Router();

router.get('/', authenticate, getAllComments);
router.get('/comments/:id', authenticate, getCommentById);
router.post('/create-comment', authenticate, createComment);
router.patch('/update-comment/:id', authenticate, updateComment);
router.delete('/delete-comment/:id', authenticate, deleteComment);

export default router;