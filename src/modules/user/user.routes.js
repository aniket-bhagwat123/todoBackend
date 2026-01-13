import express from 'express';
import { registerUser, fetchUserById, getUserList, updateUserInfo, softDeleteUser } from './user.controller.js';

const router = express.Router();

router.get('/', getUserList);
router.post('/signup', registerUser);
router.get('/get-user/:id', fetchUserById);
router.patch('/update-user', updateUserInfo);
router.post('/delete-user/:id', softDeleteUser);

export default router;