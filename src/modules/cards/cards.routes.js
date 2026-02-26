import express from 'express';
import {
  createCard,
  getCardList,
  getCardById,
  updateCard,
  softDeleteCard,
} from './cards.controller.js';
import { authenticate } from '../../utils/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getCardList);
router.post('/create-card', authenticate, createCard);
router.patch('/update-card', authenticate, updateCard);
router.get('/:id', authenticate, getCardById);
router.delete('/:id', authenticate, softDeleteCard);

export default router;