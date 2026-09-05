import { Router } from 'express';
import { addWishlistItem, getMyWishlist, removeWishlistItem } from '../controllers/wishlistController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', getMyWishlist);
router.post('/items', addWishlistItem);
router.delete('/items/:productId', removeWishlistItem);

export default router;
