import { Router } from 'express';
import { getProducts, getProductBySlug, createProduct } from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/', createProduct);

export default router;