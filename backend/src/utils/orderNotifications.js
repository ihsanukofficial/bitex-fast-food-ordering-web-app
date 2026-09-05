import { notifyUser } from '../services/notificationService.js';

const getOrderCode = (order) => order._id.toString().slice(-6).toUpperCase();

const ORDER_STATUS_NOTIFICATION_COPY = {
  pending: {
    type: 'order_placed',
    title: 'Order Placed',
    message: (code) => `Your order #${code} has been placed successfully.`,
  },
  confirmed: {
    type: 'order_confirmed',
    title: 'Order Confirmed',
    message: (code) => `Your order #${code} has been confirmed and will be prepared soon.`,
  },
  preparing: {
    type: 'order_preparing',
    title: 'Order Preparing',
    message: (code) => `Your order #${code} is being prepared.`,
  },
  out_for_delivery: {
    type: 'order_out_for_delivery',
    title: 'Out for Delivery',
    message: (code) => `Your order #${code} is out for delivery.`,
  },
  delivered: {
    type: 'order_delivered',
    title: 'Order Delivered',
    message: (code) => `Your order #${code} has been delivered. Enjoy your meal!`,
  },
  cancelled: {
    type: 'order_cancelled',
    title: 'Order Cancelled',
    message: (code) => `Your order #${code} has been cancelled.`,
  },
};

/**
 * Notifies an order's owner about a status change. Delivery is best-effort (logged, not
 * thrown) so a notification hiccup never breaks the checkout or admin status-update flow.
 */
export const notifyOrderStatus = (order, status) => {
  const copy = ORDER_STATUS_NOTIFICATION_COPY[status];
  if (!copy) return;

  const code = getOrderCode(order);
  notifyUser({
    userId: order.user,
    type: copy.type,
    title: copy.title,
    message: copy.message(code),
    orderId: order._id,
  }).catch((error) => console.error('Failed to send order notification:', error));
};
