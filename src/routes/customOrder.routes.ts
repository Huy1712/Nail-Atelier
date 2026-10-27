import { Router } from 'express';
import { createCustomOrder } from '../controllers/customOrder.controller';

const router = Router();

router.post('/', createCustomOrder);

export default router;