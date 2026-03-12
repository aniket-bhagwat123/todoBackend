import express from 'express';
import userRoutes from './modules/user/user.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import boardRoutes from './modules/boards/boards.routes.js';
import cardRoutes from './modules/cards/cards.routes.js';
import commentRoutes from './modules/comments/comments.routes.js';
import uploadRoutes from './modules/uploads/uploadRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/boards', boardRoutes);
router.use('/cards', cardRoutes);
router.use('/comments', commentRoutes);
router.use('/upload', uploadRoutes);

export default router;