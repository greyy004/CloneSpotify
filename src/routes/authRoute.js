import express from 'express';
import { getLoginPage, authenticateUser, getRegisterPage, registerUser } from '../controllers/authController.js';
import { validateRegistration } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Login Routes
router.get('/login', getLoginPage);
router.post('/login', authenticateUser);

// Register Routes
router.get('/register', getRegisterPage);
router.post('/register', validateRegistration, registerUser); // Apply middleware before controller

export default router;
