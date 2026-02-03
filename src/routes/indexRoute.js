import express from 'express';
import { getIndex, getRegister, getLogin, getSearch } from '../controllers/indexController.js';
const router = express.Router();

router.get('/', getIndex);
router.get('/register',getRegister);
router.get('/login', getLogin);
router.get('/search', getSearch);

export default router;