import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { validateLogin, validateRegistration } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/login', validateLogin, loginUser);

router.post('/register', validateRegistration, registerUser);
router.get('/logout', logoutUser);

export default router;
