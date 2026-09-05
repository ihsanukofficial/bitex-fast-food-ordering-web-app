import Notification from '../models/Notification.js';
import { emitToUser } from '../realtime/socket.js';

/**
 * Persists a notification and pushes it over the user's socket room in the same shape
 * the REST history endpoint returns, so the frontend can handle both sources identically.
 */
export const notifyUser = async ({ userId, type, title, message, orderId }) => {
  const notification = await Notification.create({
    user: userId,
    type,
    title,
    message,
    order: orderId,
  });

  emitToUser(userId, 'notification:new', {
    _id: notification._id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    order: notification.order,
    read: notification.read,
    createdAt: notification.createdAt,
  });

  return notification;
};
