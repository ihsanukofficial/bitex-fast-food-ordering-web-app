import { Router } from 'express';
import {
  addCartItem,
  clearCart,
  getMyCart,
  removeCartItem,
  updateCartItemQuantity,
} from '../controllers/cartController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', getMyCart);
router.post('/items', addCartItem);
router.patch('/items/:itemId', updateCartItemQuantity);
router.delete('/items/:itemId', removeCartItem);
router.delete('/', clearCart);

export default router;
