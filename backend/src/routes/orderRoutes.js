import { Router } from 'express';
import { createOrder, getOrderById, listOrders, updateOrderStatus } from '../controllers/orderController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.post('/', createOrder);
router.get('/', requireAdmin, listOrders);
router.get('/:id', requireAdmin, getOrderById);
router.patch('/:id/status', requireAdmin, updateOrderStatus);

export default router;
