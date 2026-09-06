/**
 * Single source of truth for turning a base amount + discount percentage into the
 * price actually charged. Never store the result — always recompute it from the two
 * authoritative numbers (product.price for "simple" products, the selected variation
 * option for "variation" products) so nothing can drift out of sync.
 */
export const calculateDiscountedPrice = (amount, discountPercentage) => {
  const base = Number(amount) || 0;
  const percentage = Math.min(100, Math.max(0, Number(discountPercentage) || 0));
  return Math.max(0, Math.round(base - (base * percentage) / 100));
};

/**
 * Resolves the authoritative price for a product given its pricingType. For a
 * "variation" product, pass the already-selected option — there is no product-level
 * price to fall back on (product.price is null by design). Returns null when the
 * price can't be resolved at all: no option selected/available for a "variation"
 * product, or a malformed "simple" product with no price object (never true for a
 * product that passed assertValidPricing, but a defensive check here means a bad
 * document prices at "unknown" instead of silently charging Rs. 0).
 */
export const getProductBasePricing = (product, selectedOption) => {
  if (product.pricingType === 'variation') {
    if (!selectedOption) return null;
    return {
      amount: selectedOption.price,
      discountPercentage: selectedOption.discountPercentage || 0,
      discountedPrice: calculateDiscountedPrice(selectedOption.price, selectedOption.discountPercentage),
    };
  }

  if (!product.price) return null;
  return {
    amount: product.price.amount,
    discountPercentage: product.price.discountPercentage || 0,
    discountedPrice: calculateDiscountedPrice(product.price.amount, product.price.discountPercentage),
  };
};
