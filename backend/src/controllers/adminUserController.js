import DealSection from '../models/DealSection.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { emitToUser } from '../realtime/socket.js';
import { logActivity } from '../services/activityLogService.js';
import { notifyUser } from '../services/notificationService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const NOTIFICATION_MESSAGE_MAX_LENGTH = 500;

export const getStats = asyncHandler(async (req, res) => {
  const [productCount, userCount, orderCount, dealSections, revenueAgg] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments(),
    Order.countDocuments(),
    DealSection.find().select('deals'),
    Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]),
  ]);
  const pendingOrders = await Order.countDocuments({ status: 'pending' });

  res.json({
    stats: {
      products: productCount,
      users: userCount,
      orders: orderCount,
      pendingOrders,
      deals: dealSections.reduce((total, section) => total + section.deals.length, 0),
      revenue: revenueAgg[0]?.total || 0,
    },
  });
});

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json({ users });
});

/** Powers the admin User Detail page. */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) throw new ApiError(404, 'User not found.');
  res.json({ user });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { role, active } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found.');

  if (user._id.equals(req.user._id) && (role === 'user' || active === false)) {
    throw new ApiError(400, 'You cannot remove your own admin access or deactivate your own account.');
  }

  const wasAdmin = user.role === 'admin';

  if (role !== undefined) {
    if (!['user', 'admin'].includes(role)) throw new ApiError(400, 'Invalid role.');
    user.role = role;
  }
  if (active !== undefined) user.active = Boolean(active);

  await user.save();

  if (role !== undefined) {
    logActivity({
      user: req.user,
      action: 'user.role_changed',
      description: `${req.user.name} ${role === 'admin' ? 'granted' : 'revoked'} admin access for ${user.name}.`,
      targetType: 'user',
      targetId: user._id,
      targetLabel: user.name,
    });
  }
  if (active !== undefined) {
    logActivity({
      user: req.user,
      action: 'user.status_changed',
      description: `${req.user.name} ${user.active ? 'reactivated' : 'deactivated'} ${user.name}'s account.`,
      targetType: 'user',
      targetId: user._id,
      targetLabel: user.name,
    });
  }

  if (wasAdmin && user.role !== 'admin') {
    emitToUser(user._id, 'auth:access-revoked', {
      message: 'Your admin access has been revoked.',
    });
  }

  res.json({ user: { ...user.toObject(), passwordHash: undefined } });
});

/** Sends a one-off custom message to a single user's notification bell, in real time. */
export const sendUserNotification = asyncHandler(async (req, res) => {
  const message = req.body.message?.trim();
  if (!message) throw new ApiError(400, 'Message is required.');
  if (message.length > NOTIFICATION_MESSAGE_MAX_LENGTH) {
    throw new ApiError(400, `Message must be ${NOTIFICATION_MESSAGE_MAX_LENGTH} characters or fewer.`);
  }

  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found.');

  const notification = await notifyUser({
    userId: user._id,
    type: 'admin_message',
    title: 'Message from BiteX',
    message,
  });

  logActivity({
    user: req.user,
    action: 'user.notification_sent',
    description: `${req.user.name} sent a notification to ${user.name}.`,
    targetType: 'user',
    targetId: user._id,
    targetLabel: user.name,
  });

  res.status(201).json({ notification });
});
