import DealSection from '../models/DealSection.js';
import Product from '../models/Product.js';
import PromoCode from '../models/PromoCode.js';
import { emitToAdmins } from '../realtime/socket.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { resolveActivePromoCode } from '../utils/resolvePromoCode.js';

/** A 'specific' code must name at least one real, still-existing product or deal. */
const assertScopeReferencesRealItems = async (body) => {
  if (body.appliesTo !== 'specific') return;

  const productIds = body.products || [];
  const dealIds = body.deals || [];
  if (productIds.length === 0 && dealIds.length === 0) {
    throw new ApiError(400, 'Select at least one product or deal for a specific-item promo code.');
  }

  if (productIds.length > 0) {
    const count = await Product.countDocuments({ _id: { $in: productIds } });
    if (count !== new Set(productIds.map(String)).size) {
      throw new ApiError(400, 'One or more selected products no longer exist.');
    }
  }

  if (dealIds.length > 0) {
    const sections = await DealSection.find({ 'deals.id': { $in: dealIds } }).select('deals.id');
    const existingDealIds = new Set(sections.flatMap((section) => section.deals.map((deal) => deal.id)));
    if (dealIds.some((id) => !existingDealIds.has(id))) {
      throw new ApiError(400, 'One or more selected deals no longer exist.');
    }
  }
};

export const validatePromoCode = asyncHandler(async (req, res) => {
  const { code } = req.body;
  if (!code?.trim()) throw new ApiError(400, 'A promo code is required.');

  const promoCode = await resolveActivePromoCode(code);
  if (!promoCode) {
    res.json({ valid: false });
    return;
  }

  res.json({
    valid: true,
    discountPercentage: promoCode.discountPercentage,
    appliesTo: promoCode.appliesTo,
    productIds: promoCode.products.map((id) => id.toString()),
    dealIds: promoCode.deals,
  });
});

export const listPromoCodes = asyncHandler(async (req, res) => {
  const promoCodes = await PromoCode.find().sort({ createdAt: -1 });
  res.json({ promoCodes });
});

export const createPromoCode = asyncHandler(async (req, res) => {
  await assertScopeReferencesRealItems(req.body);
  const promoCode = await PromoCode.create(req.body);
  emitToAdmins('promo-code:created', promoCode);
  logActivity({
    user: req.user,
    action: 'promo_code.created',
    description: `${req.user.name} created promo code "${promoCode.code}".`,
    targetType: 'promo_code',
    targetId: promoCode._id,
    targetLabel: promoCode.code,
  });
  res.status(201).json({ promoCode });
});

export const updatePromoCode = asyncHandler(async (req, res) => {
  const promoCode = await PromoCode.findById(req.params.id);
  if (!promoCode) throw new ApiError(404, 'Promo code not found.');

  await assertScopeReferencesRealItems(req.body);
  Object.assign(promoCode, req.body);
  await promoCode.save();
  emitToAdmins('promo-code:updated', promoCode);
  logActivity({
    user: req.user,
    action: 'promo_code.updated',
    description: `${req.user.name} updated promo code "${promoCode.code}".`,
    targetType: 'promo_code',
    targetId: promoCode._id,
    targetLabel: promoCode.code,
  });
  res.json({ promoCode });
});

export const deletePromoCode = asyncHandler(async (req, res) => {
  const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
  if (!promoCode) throw new ApiError(404, 'Promo code not found.');
  emitToAdmins('promo-code:deleted', { _id: promoCode._id });
  logActivity({
    user: req.user,
    action: 'promo_code.deleted',
    description: `${req.user.name} deleted promo code "${promoCode.code}".`,
    targetType: 'promo_code',
    targetId: promoCode._id,
    targetLabel: promoCode.code,
  });
  res.status(204).end();
});
