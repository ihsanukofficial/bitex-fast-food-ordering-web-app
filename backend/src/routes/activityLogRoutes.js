import { Router } from 'express';
import { listActivityLogs } from '../controllers/activityLogController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireAdmin);
router.get('/', listActivityLogs);

export default router;
