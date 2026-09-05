import PromoCode from '../models/PromoCode.js';

/**
 * Looks up a promo code and returns it only if currently usable (active, not expired,
 * under its usage limit). Shared by the validate-code endpoint and order creation so
 * both apply identical rules.
 */
export const resolveActivePromoCode = async (code) => {
  if (!code?.trim()) return null;

  const promoCode = await PromoCode.findOne({ code: code.trim().toUpperCase() });
  if (!promoCode || !promoCode.active) return null;
  if (promoCode.expiresAt && promoCode.expiresAt < new Date()) return null;
  if (promoCode.usageLimit !== null && promoCode.usageCount >= promoCode.usageLimit) return null;

  return promoCode;
};

/**
 * Computes the discount a resolved promo code actually earns against a priced cart —
 * the full lineTotal sum for an 'all' code, or only the lines matching its configured
 * products/deals for a 'specific' one. Shared by checkout and the cart-side preview so
 * both apply identical scoping rules.
 */
export const computeDiscount = (promoCode, pricedItems) => {
  const eligibleItems =
    promoCode.appliesTo === 'specific'
      ? pricedItems.filter(
          (item) =>
            (item.itemType === 'product' &&
              promoCode.products.some((id) => id.toString() === item.productId)) ||
            (item.itemType === 'deal' && promoCode.deals.includes(item.dealId)),
        )
      : pricedItems;

  const eligibleSubtotal = eligibleItems.reduce((total, item) => total + item.lineTotal, 0);
  return Math.round(eligibleSubtotal * (promoCode.discountPercentage / 100));
};
