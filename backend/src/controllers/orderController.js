import Cart from '../models/Cart.js';
import Order, { ORDER_STATUSES } from '../models/Order.js';
import PromoCode from '../models/PromoCode.js';
import { emitToAdmins } from '../realtime/socket.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { priceCartItem } from '../utils/cartPricing.js';
import { notifyOrderStatus } from '../utils/orderNotifications.js';
import { computeDiscount, resolveActivePromoCode } from '../utils/resolvePromoCode.js';

const getOrderCode = (order) => order._id.toString().slice(-6).toUpperCase();

const validateDelivery = (delivery) => {
  const name = delivery?.name?.trim() || '';
  const phone = delivery?.phone?.trim() || '';
  const address = delivery?.address?.trim() || '';

  if (name.length < 2) throw new ApiError(400, 'Please enter a valid delivery name.');
  if (!/^\d{7,15}$/.test(phone.replace(/\D/g, ''))) {
    throw new ApiError(400, 'Please enter a valid delivery phone number.');
  }
  if (address.length < 10) throw new ApiError(400, 'Please enter a complete delivery address.');

  return {
    name,
    phone,
    email: delivery?.email?.trim() || '',
    address,
    instructions: delivery?.instructions?.trim() || '',
  };
};

export const createOrder = asyncHandler(async (req, res) => {
  // Items are re-resolved from the authenticated user's own persisted cart — never
  // trusted from the request body — so checkout can't be tampered with or drift out
  // of sync with what the database says the cart actually contains.
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Your cart is empty.');
  }

  const { delivery, promoCode } = req.body;
  const pricedItems = await Promise.all(cart.items.map((item) => priceCartItem(item)));
  const validatedDelivery = validateDelivery(delivery);

  const subtotal = pricedItems.reduce((total, item) => total + item.lineTotal, 0);
  const activePromoCode = await resolveActivePromoCode(promoCode);
  const discount = activePromoCode ? computeDiscount(activePromoCode, pricedItems) : 0;
  const total = Math.max(0, subtotal - discount);

  const order = await Order.create({
    user: req.user._id,
    items: pricedItems,
    subtotal,
    promoCode: activePromoCode?.code || '',
    discount,
    total,
    delivery: validatedDelivery,
    status: 'pending',
  });

  cart.items = [];
  await cart.save();

  // Usage is counted once an order is actually placed with the code attached — never
  // for a cart-side preview — and via an atomic increment so concurrent checkouts
  // can't undercount each other.
  if (activePromoCode) {
    const updatedPromoCode = await PromoCode.findByIdAndUpdate(
      activePromoCode._id,
      { $inc: { usageCount: 1 } },
      { new: true },
    );
    emitToAdmins('promo-code:updated', updatedPromoCode);
  }

  notifyOrderStatus(order, order.status);
  await order.populate('user', 'name email');
  emitToAdmins('order:created', order);
  logActivity({
    user: req.user,
    action: 'order.placed',
    description: `${req.user.name} placed order #${getOrderCode(order)}.`,
    targetType: 'order',
    targetId: order._id,
    targetLabel: `#${getOrderCode(order)}`,
  });

  res.status(201).json({ order });
});

export const listOrders = asyncHandler(async (req, res) => {
  const { status, user } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (user) filter.user = user;
  const orders = await Order.find(filter).populate('user', 'name email').sort({ createdAt: -1 });
  res.json({ orders });
});

/** Powers the admin Order Detail page. */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) throw new ApiError(404, 'Order not found.');
  res.json({ order });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!ORDER_STATUSES.includes(status)) throw new ApiError(400, 'Invalid order status.');

  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found.');

  order.status = status;
  await order.save();

  notifyOrderStatus(order, status);
  await order.populate('user', 'name email');
  emitToAdmins('order:updated', order);
  logActivity({
    user: req.user,
    action: 'order.status_updated',
    description: `${req.user.name} marked order #${getOrderCode(order)} as ${status.replace(/_/g, ' ')}.`,
    targetType: 'order',
    targetId: order._id,
    targetLabel: `#${getOrderCode(order)}`,
  });

  res.json({ order });
});
