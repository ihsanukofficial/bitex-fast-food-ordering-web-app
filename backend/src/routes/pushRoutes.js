import { Router } from 'express';
import PushSubscription from '../models/PushSubscription.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import { getPublicKey, notifyAdminsPush } from '../services/pushService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/public-key', (req, res) => {
  res.json({ publicKey: getPublicKey() });
});

router.post(
  '/subscribe',
  asyncHandler(async (req, res) => {
    const { endpoint, keys } = req.body || {};
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      throw new ApiError(400, 'Invalid push subscription.');
    }

    await PushSubscription.findOneAndUpdate(
      { endpoint },
      { user: req.user._id, endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth } },
      { upsert: true, setDefaultsOnInsert: true },
    );
    res.status(201).json({ ok: true });
  }),
);

router.post(
  '/test',
  asyncHandler(async (req, res) => {
    await notifyAdminsPush({
      title: 'Order alerts are on',
      body: 'You will now be notified when a new order comes in.',
      url: '/admin/orders',
      tag: 'push-test',
    });
    res.json({ ok: true });
  }),
);

router.post(
  '/unsubscribe',
  asyncHandler(async (req, res) => {
    await PushSubscription.deleteOne({ endpoint: req.body?.endpoint, user: req.user._id });
    res.json({ ok: true });
  }),
);

export default router;
