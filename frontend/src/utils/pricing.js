/**
 * Single source of truth for turning a base amount + discount percentage into the
 * price actually charged. Mirrors the backend's utils/pricing.js formula exactly so
 * the storefront never shows a number the server would price differently at checkout.
 */
export const calculateDiscountedPrice = (amount, discountPercentage) => {
  const base = Number(amount) || 0;
  const percentage = Math.min(100, Math.max(0, Number(discountPercentage) || 0));
  return Math.max(0, Math.round(base - (base * percentage) / 100));
};

/**
 * Resolves the price to display for a product, given the customer's current variation
 * selections (a `{ [variationName]: optionLabel }` map). A "simple" product's own
 * price is always authoritative. A "variation" product has no product-level price
 * (price is null by design) — its authoritative price is whichever option is
 * selected, or the cheapest priced option as a "starting from" price before a
 * required choice is made. Returns null only for a malformed variation product with
 * no priced options at all.
 */
export const getProductPricing = (product, selections = {}) => {
  if (product.pricingType === 'simple') {
    if (!product.price) return null;
    return {
      amount: product.price.amount,
      discountPercentage: product.price.discountPercentage || 0,
      discountedPrice: calculateDiscountedPrice(product.price.amount, product.price.discountPercentage),
      isStartingPrice: false,
    };
  }

  // The backend rejects a product with more than one priced variation (see
  // productController.js's assertValidPricing), so at most one exists here — no
  // ambiguity about which variation's selection determines the price.
  const pricedVariation = product.variations.find((variation) =>
    variation.options.some((option) => option.price != null),
  );
  const selectedOption = pricedVariation?.options.find(
    (option) => option.label === selections[pricedVariation.name],
  );
  // Compare by what the customer would actually pay, not the sticker price — an
  // option with a steep discount can cost less than a cheaper-looking option with
  // none, and "starting from" should always name the true cheapest choice.
  const cheapestOption = pricedVariation?.options
    .filter((option) => option.price != null)
    .reduce(
      (cheapest, option) =>
        cheapest == null ||
        calculateDiscountedPrice(option.price, option.discountPercentage) <
          calculateDiscountedPrice(cheapest.price, cheapest.discountPercentage)
          ? option
          : cheapest,
      null,
    );

  const option = selectedOption || cheapestOption;
  if (!option) return null;

  return {
    amount: option.price,
    discountPercentage: option.discountPercentage || 0,
    discountedPrice: calculateDiscountedPrice(option.price, option.discountPercentage),
    isStartingPrice: !selectedOption,
  };
};
