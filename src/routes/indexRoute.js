import express from 'express';
import { getIndex, getRegister, getLogin } from '../controllers/indexController.js';
const router = express.Router();

router.get('/', getIndex);
router.get('/register',getRegister);
router.get('/login',getLogin)

export default router;