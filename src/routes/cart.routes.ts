import { Router } from 'express';
import { getCart, addToCart } from '../controllers/cart.controller';

const router = Router();

router.get('/:userId', getCart);
router.post('/items', addToCart);

export default router;