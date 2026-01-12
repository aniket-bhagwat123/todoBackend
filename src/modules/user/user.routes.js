import express from 'express';
import { registerUser, fetchUserByEmail } from './user.controller.js';

const router = express.Router();

router.post('/signup', registerUser);
router.get('/get-user/:email', fetchUserByEmail);

export default router;