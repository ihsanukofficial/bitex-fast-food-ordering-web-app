import { Router } from 'express';
import { deleteReview, listReviews } from '../controllers/adminReviewController.js';
import {
  deleteUser,
  getStats,
  getUserById,
  listUsers,
  sendUserNotification,
  updateUser,
} from '../controllers/adminUserController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, requireAdmin);
router.get('/stats', getStats);
router.get('/users', listUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:id/notifications', sendUserNotification);
router.get('/reviews', listReviews);
router.delete('/reviews/:reviewId', deleteReview);

export default router;
