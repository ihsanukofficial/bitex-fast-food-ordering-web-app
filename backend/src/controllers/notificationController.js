import Notification from '../models/Notification.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

/**
 * Paginated by a `before` cursor (the createdAt of the oldest notification already
 * loaded) rather than a numeric offset — so a "Load more" click stays correct even
 * if a new notification arrives via socket and gets prepended to the list in between,
 * which would otherwise shift a plain skip/limit window.
 */
export const listNotifications = asyncHandler(async (req, res) => {
  const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(req.query.limit) || DEFAULT_PAGE_SIZE));
  const filter = { user: req.user._id };

  if (req.query.before) {
    const beforeDate = new Date(req.query.before);
    if (!Number.isNaN(beforeDate.getTime())) filter.createdAt = { $lt: beforeDate };
  }

  // Fetch one extra to learn whether another page exists, without a separate count query.
  const page = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit + 1);
  const hasMore = page.length > limit;
  const notifications = page.slice(0, limit);

  const unreadCount = await Notification.countDocuments({ user: req.user._id, read: false });
  res.json({ notifications, unreadCount, hasMore });
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({ _id: req.params.id, user: req.user._id });
  if (!notification) throw new ApiError(404, 'Notification not found.');

  notification.read = true;
  await notification.save();
  res.json({ notification });
});

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
  res.json({ success: true });
});
