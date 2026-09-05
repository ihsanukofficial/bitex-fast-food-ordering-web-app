import { Router } from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/', requireAuth, requireAdmin, upload.single('file'), uploadFile);

export default router;
