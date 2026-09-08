/**
 * Shared status vocabulary for every customer-facing order surface (profile overview,
 * order history, order details). Must stay in sync with backend/src/models/Order.js's
 * ORDER_STATUSES enum and mirrors the color grouping already used in the admin panel
 * (admin.module.css) so a status reads the same way across both experiences.
 */
export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const ORDER_STATUS_TONES = {
  pending: 'warning',
  confirmed: 'warning',
  preparing: 'info',
  out_for_delivery: 'info',
  delivered: 'success',
  cancelled: 'danger',
};

export const getOrderStatusLabel = (status) => ORDER_STATUS_LABELS[status] || status;

export const getOrderCode = (orderId) => `#${String(orderId).slice(-8).toUpperCase()}`;

export const formatCurrency = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;

export const formatOrderDate = (isoString) =>
  new Date(isoString).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatOrderDateTime = (isoString) =>
  new Date(isoString).toLocaleString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

/** A short "2× Burger, 1× Fries +2 more" summary for compact order cards. */
export const summarizeOrderItems = (items, maxVisible = 2) => {
  const visible = items.slice(0, maxVisible).map((item) => `${item.quantity}× ${item.title}`);
  const remaining = items.length - visible.length;
  return remaining > 0 ? `${visible.join(', ')} +${remaining} more` : visible.join(', ');
};

/**
 * Account-level totals for the profile overview, derived entirely from the customer's
 * own order list (the only data source the backend exposes for these numbers) —
 * "spent" only counts delivered orders, matching what a customer actually paid for.
 */
export const computeAccountStats = (orders) => {
  const completedOrders = orders.filter((order) => order.status === 'delivered');
  const totalReviews = orders.reduce(
    (count, order) => count + order.items.filter((item) => item.review).length,
    0,
  );

  return {
    totalOrders: orders.length,
    completedOrders: completedOrders.length,
    totalReviews,
    totalSpent: completedOrders.reduce((sum, order) => sum + order.total, 0),
  };
};
