import express from 'express';
import { getUserPage, getAllMusic, getMusicById, searchMusic, likeMusic } from '../controllers/userController.js';

const router = express.Router();

router.get('/dashboard', getUserPage);
router.get('/music/search', searchMusic);
router.get('/music', getAllMusic);
router.get('/music/:id', getMusicById);
router.post('/music/:id/like', likeMusic);

export default router;