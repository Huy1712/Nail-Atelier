import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// Đường dẫn POST: /api/auth/login
router.post('/login', login);

export default router;