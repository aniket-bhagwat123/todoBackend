import express from 'express';
import { authenticate } from '../../utils/auth.middleware.js';
import { createSpring, deleteSpring, fetchSpringById, getSpringList, updateSpring } from './springs.controller.js';

const router = express.Router();

router.get('/', authenticate, getSpringList);
router.post('/create-spring', authenticate, createSpring);
router.patch('/update-spring', authenticate, updateSpring);
router.get('/get-spring/:id', authenticate, fetchSpringById);
router.delete('/delete-spring/:id', authenticate, deleteSpring);

export default router;