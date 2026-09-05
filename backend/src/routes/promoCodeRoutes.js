import { Router } from 'express';
import {
  createPromoCode,
  deletePromoCode,
  listPromoCodes,
  updatePromoCode,
  validatePromoCode,
} from '../controllers/promoCodeController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/validate', validatePromoCode);
router.get('/', requireAuth, requireAdmin, listPromoCodes);
router.post('/', requireAuth, requireAdmin, createPromoCode);
router.put('/:id', requireAuth, requireAdmin, updatePromoCode);
router.delete('/:id', requireAuth, requireAdmin, deletePromoCode);

export default router;
