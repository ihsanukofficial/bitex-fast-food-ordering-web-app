import { unlink } from 'node:fs/promises';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import Cart from '../models/Cart.js';
import DealSection from '../models/DealSection.js';
import Notification from '../models/Notification.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import Wishlist from '../models/Wishlist.js';
import { uploadsDirectory } from '../middleware/upload.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { clearAuthCookie } from '../utils/jwt.js';
import { toPublicUser } from './authController.js';

const PASSWORD_MIN_LENGTH = 8;

/**
 * Best-effort delete of a previously uploaded avatar file. Only ever targets files
 * under uploadsDirectory (never an arbitrary path), and a missing/already-gone file
 * is not an error — the goal is just not to accumulate orphaned images over time.
 */
const deleteAvatarFile = async (avatarUrl) => {
  if (!avatarUrl || !avatarUrl.startsWith('/uploads/')) return;
  const filePath = path.join(uploadsDirectory, path.basename(avatarUrl));
  await unlink(filePath).catch(() => {});
};

export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No image was uploaded.');

  const previousAvatar = req.user.avatar;
  req.user.avatar = `/uploads/${req.file.filename}`;
  await req.user.save();
  await deleteAvatarFile(previousAvatar);

  logActivity({
    user: req.user,
    action: 'user.avatar_updated',
    description: `${req.user.name} updated their profile photo.`,
    targetType: 'user',
    targetId: req.user._id,
    targetLabel: req.user.name,
  });

  res.json({ user: toPublicUser(req.user) });
});

export const removeAvatar = asyncHandler(async (req, res) => {
  const previousAvatar = req.user.avatar;
  req.user.avatar = '';
  await req.user.save();
  await deleteAvatarFile(previousAvatar);

  logActivity({
    user: req.user,
    action: 'user.avatar_removed',
    description: `${req.user.name} removed their profile photo.`,
    targetType: 'user',
    targetId: req.user._id,
    targetLabel: req.user.name,
  });

  res.json({ user: toPublicUser(req.user) });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;
  const user = req.user;
  const wasModified = { name: false, phone: false, address: false };

  if (name !== undefined) {
    if (!name.trim()) throw new ApiError(400, 'Name cannot be empty.');
    wasModified.name = name.trim() !== user.name;
    user.name = name.trim();
  }
  if (phone !== undefined) {
    wasModified.phone = phone.trim() !== user.phone;
    user.phone = phone.trim();
  }
  if (address !== undefined) {
    wasModified.address = address.trim() !== user.address;
    user.address = address.trim();
  }

  await user.save();

  const changedFields = Object.keys(wasModified).filter((field) => wasModified[field]);
  if (changedFields.length > 0) {
    logActivity({
      user,
      action: 'user.profile_updated',
      description: `${user.name} updated their ${changedFields.join(', ')}.`,
      targetType: 'user',
      targetId: user._id,
      targetLabel: user.name,
    });
  }

  res.json({ user: toPublicUser(user) });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'Current and new password are required.');
  }
  if (newPassword.length < PASSWORD_MIN_LENGTH) {
    throw new ApiError(400, `New password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
  }

  const user = req.user;
  const currentMatches = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!currentMatches) throw new ApiError(401, 'Current password is incorrect.');

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  logActivity({
    user,
    action: 'user.password_changed',
    description: `${user.name} changed their account password.`,
    targetType: 'user',
    targetId: user._id,
    targetLabel: user.name,
  });

  res.status(204).end();
});

/**
 * Permanently removes a user's account and the private, no-longer-useful data it
 * owns (cart, wishlist, notifications, avatar file). Shared by the self-service
 * deleteAccount below and the admin-initiated deleteUser (adminUserController) so
 * both paths stay in sync. Orders, reviews, and activity-log entries are kept as
 * historical records — they already denormalize the customer's name/email so they
 * stay meaningful once the account is gone (see ActivityLog's own comment, and
 * Order's user?.name fallback to its delivery snapshot on the admin screens).
 */
export const purgeUserAccount = async (user) => {
  await Promise.all([
    Cart.deleteOne({ user: user._id }),
    Wishlist.deleteOne({ user: user._id }),
    Notification.deleteMany({ user: user._id }),
  ]);
  await deleteAvatarFile(user.avatar);
  await User.deleteOne({ _id: user._id });
};

export const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;
  if (!password) throw new ApiError(400, 'Password is required.');

  const user = req.user;
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) throw new ApiError(401, 'Incorrect password.');

  logActivity({
    user,
    action: 'user.account_deleted',
    description: `${user.name} deleted their own account.`,
    targetType: 'user',
    targetId: user._id,
    targetLabel: user.name,
  });

  await purgeUserAccount(user);

  clearAuthCookie(res);
  res.status(204).end();
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

  // Attach each item's own review (if any) so the profile page can show a submitted
  // review inline and prompt for one only where it's actually still missing.
  const reviews = await Review.find({ user: req.user._id }).select(
    'order orderItemIndex stars text createdAt',
  );
  const reviewByItem = new Map(
    reviews.map((review) => [`${review.order}:${review.orderItemIndex}`, review]),
  );

  // A product or deal referenced by an old order can later be deleted (or, in this
  // dev environment, replaced by re-seeding, which reissues every product a new id).
  // Reviewing a line whose target no longer exists would always fail server-side, so
  // flag it here rather than let the profile page offer a review action that can
  // never succeed.
  const productIds = [
    ...new Set(
      orders.flatMap((order) =>
        order.items.filter((item) => item.itemType === 'product').map((item) => item.productId),
      ),
    ),
  ];
  const existingProducts = await Product.find({ _id: { $in: productIds } }).select('_id');
  const existingProductIds = new Set(existingProducts.map((product) => product._id.toString()));

  const dealIds = [
    ...new Set(
      orders.flatMap((order) =>
        order.items.filter((item) => item.itemType === 'deal').map((item) => item.dealId),
      ),
    ),
  ];
  const dealSections = dealIds.length
    ? await DealSection.find({ 'deals.id': { $in: dealIds } }).select('deals.id')
    : [];
  const existingDealIds = new Set(dealSections.flatMap((section) => section.deals.map((deal) => deal.id)));

  const ordersWithReviews = orders.map((order) => {
    const plainOrder = order.toObject();
    plainOrder.items = plainOrder.items.map((item, index) => ({
      ...item,
      review: reviewByItem.get(`${order._id}:${index}`) || null,
      itemAvailable:
        item.itemType === 'product'
          ? existingProductIds.has(item.productId)
          : existingDealIds.has(item.dealId),
    }));
    return plainOrder;
  });

  res.json({ orders: ordersWithReviews });
});
