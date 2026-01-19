import express from 'express';
import {
  createBoard,
  getBoardList,
  getBoardById,
  updateBoard,
  softDeleteBoard,
} from './boards.controller.js';
import { authenticate } from '../../utils/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getBoardList);
router.post('/create-board', authenticate, createBoard);
router.patch('/update-board', authenticate, updateBoard);
router.get('/:id', authenticate, getBoardById);
router.delete('/:id', authenticate, softDeleteBoard);

export default router;