import express from 'express';
import {getUserPage} from '../controllers/userController.js'

const router = express.Router();

router.get('/dashboard', getUserPage);

export default router;