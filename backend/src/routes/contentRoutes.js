import { Router } from 'express';
import { getPageContent, updatePageContent } from '../controllers/contentController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/:page', getPageContent);
router.put('/:page', requireAuth, requireAdmin, updatePageContent);

export default router;
