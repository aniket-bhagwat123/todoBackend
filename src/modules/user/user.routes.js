import express from 'express';
import { fetchUserById, getUserList, updateUserInfo, softDeleteUser } from './user.controller.js';
import { authenticate } from '../../utils/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getUserList);
router.get('/get-user/:id', authenticate, fetchUserById);
router.patch('/update-user', authenticate, updateUserInfo);
router.delete('/delete-user/:id', authenticate, softDeleteUser);

export default router;