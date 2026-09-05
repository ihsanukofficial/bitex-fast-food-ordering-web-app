import { Router } from 'express';
import {
  changePassword,
  deleteAccount,
  myOrders,
  removeAvatar,
  updateAvatar,
  updateProfile,
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { ApiError } from '../utils/ApiError.js';

const router = Router();

/**
 * Wraps multer's callback-style error (wrong file type, over the size limit) into an
 * ApiError so it reaches the client as a normal { message } JSON response instead of
 * falling through to the generic 500 handler.
 */
const handleAvatarUpload = (req, res, next) => {
  upload.single('avatar')(req, res, (error) => {
    if (error) return next(new ApiError(400, error.message || 'Failed to upload image.'));
    next();
  });
};

router.use(requireAuth);
router.put('/me', updateProfile);
router.put('/me/password', changePassword);
router.delete('/me', deleteAccount);
router.get('/me/orders', myOrders);
router.post('/me/avatar', handleAvatarUpload, updateAvatar);
router.delete('/me/avatar', removeAvatar);

export default router;
