import express from 'express';
import { getAdminPage, getAllUsers, getAllMusic, addMusic, updateMusic, deleteMusic } from '../controllers/adminController.js';
import { isAdminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', getAdminPage);
router.get('/users', isAdminMiddleware, getAllUsers);
router.get('/music', isAdminMiddleware, getAllMusic);
router.post('/music', isAdminMiddleware, addMusic);
router.put('/music/:id', isAdminMiddleware, updateMusic);
router.delete('/music/:id', isAdminMiddleware, deleteMusic);

export default router;
