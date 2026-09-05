import { Router } from 'express';
import {
  createDealSection,
  deleteDeal,
  deleteDealSection,
  getDealById,
  listDealSections,
  listFlatDeals,
  updateDealSection,
  upsertDeal,
} from '../controllers/dealController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listDealSections);
router.get('/flat', listFlatDeals);
router.get('/flat/:id', getDealById);
router.post('/sections', requireAuth, requireAdmin, createDealSection);
router.put('/sections/:id', requireAuth, requireAdmin, updateDealSection);
router.delete('/sections/:id', requireAuth, requireAdmin, deleteDealSection);
router.put('/sections/:sectionId/deals/:dealId', requireAuth, requireAdmin, upsertDeal);
router.delete('/sections/:sectionId/deals/:dealId', requireAuth, requireAdmin, deleteDeal);

export default router;
