import DealSection from '../models/DealSection.js';
import Product from '../models/Product.js';
import { ApiError } from './ApiError.js';
import { getProductBasePricing } from './pricing.js';
import { toCartId } from './toCartId.js';

export const MAX_ITEM_QUANTITY = 20;

export const clampQuantity = (quantity) => {
  const numeric = Number(quantity);
  if (!Number.isFinite(numeric)) return 1;
  return Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.trunc(numeric)));
};

/**
 * Re-resolves one cart product line against live catalog data and computes its
 * authoritative price. Shared by the cart and order controllers so a line is priced
 * identically whether it's being displayed in the cart or checked out — the client
 * only ever sends a productId + slugified selection ids, never a price. Returns both
 * the slug-keyed `selections` persisted on Cart/Order documents and a human-readable
 * `display` version of the same selections for cart UI rendering.
 */
export const priceProductItem = async (item) => {
  const product = await Product.findById(item.productId).catch(() => null);
  if (!product) throw new ApiError(400, `A product in your cart is no longer available.`);
  if (!product.available) {
    throw new ApiError(400, `${product.title} is currently unavailable.`);
  }

  const requestedVariations = item.selections?.variations || [];
  const selectedVariations = [];

  for (const variation of product.variations) {
    const selection = requestedVariations.find(
      (entry) => entry.variationId === toCartId(variation.name),
    );
    const option = selection
      ? variation.options.find((entry) => toCartId(entry.label) === selection.optionId)
      : null;

    if (variation.required && !option) {
      throw new ApiError(400, `Please choose a ${variation.name} option for ${product.title}.`);
    }
    if (option) {
      selectedVariations.push({
        variationId: toCartId(variation.name),
        optionId: toCartId(option.label),
        name: variation.name,
        optionLabel: option.label,
        option,
      });
    }
  }

  let pricing;
  if (product.pricingType === 'variation') {
    // assertValidPricing (productController.js) rejects a product with more than one
    // priced variation at write time, so exactly one product.variations entry is ever
    // "the" priced one. Identify it from the product definition itself — never by
    // checking a selected option's price against zero, since a deliberately free
    // option (price: 0, e.g. a "Kids" size included with a combo) is still that
    // variation's authoritative selection, not evidence it's the wrong variation.
    const pricedVariationDef = product.variations.find((variation) =>
      variation.options.some((option) => option.price != null),
    );
    const matchedSelection = selectedVariations.find((entry) => entry.name === pricedVariationDef?.name);
    pricing = getProductBasePricing(product, matchedSelection?.option);
  } else {
    pricing = getProductBasePricing(product);
  }
  if (!pricing) {
    throw new ApiError(400, `${product.title} has no price set for the selected options.`);
  }
  const basePrice = pricing.discountedPrice;

  const requestedAddons = item.selections?.addons || [];
  const selectedAddons = requestedAddons
    .map((selection) => {
      const addon = product.addons.find((entry) => toCartId(entry.name) === selection.addonId);
      return addon
        ? { addonId: toCartId(addon.name), quantity: clampQuantity(selection.quantity), addon }
        : null;
    })
    .filter(Boolean);
  const addonsPrice = selectedAddons.reduce(
    (total, { addon, quantity }) => total + addon.price * quantity,
    0,
  );

  const quantity = clampQuantity(item.quantity);
  const unitPrice = basePrice + addonsPrice;

  return {
    itemType: 'product',
    productId: product._id.toString(),
    title: product.title,
    image: product.images[0] || '',
    unitPrice,
    quantity,
    lineTotal: unitPrice * quantity,
    selections: {
      variations: selectedVariations.map(({ variationId, optionId }) => ({ variationId, optionId })),
      addons: selectedAddons.map(({ addonId, quantity: addonQuantity }) => ({
        addonId,
        quantity: addonQuantity,
      })),
    },
    display: {
      variations: selectedVariations.map(({ name, optionLabel }) => ({
        variationId: name,
        optionId: optionLabel,
      })),
      addons: selectedAddons.map(({ addon, quantity: addonQuantity }) => ({
        addonId: addon.name,
        quantity: addonQuantity,
      })),
    },
    dealItems: [],
    specialInstructions:
      typeof item.specialInstructions === 'string' ? item.specialInstructions.trim() : '',
  };
};

export const priceDealItem = async (item) => {
  const section = await DealSection.findOne({ 'deals.id': item.dealId }).populate(
    'deals.items.product',
  );
  const deal = section?.deals.find((entry) => entry.id === item.dealId);
  if (!deal) throw new ApiError(400, 'A deal in your cart is no longer available.');

  const quantity = clampQuantity(item.quantity);
  return {
    itemType: 'deal',
    dealId: deal.id,
    title: deal.name,
    image: deal.image || '',
    unitPrice: deal.price,
    quantity,
    lineTotal: deal.price * quantity,
    selections: { variations: [], addons: [] },
    display: { variations: [], addons: [] },
    // Drop items whose product was since deleted rather than fail the whole cart line.
    dealItems: (deal.items || [])
      .filter((entry) => entry.product)
      .map((entry) => ({
        title: entry.product.title,
        quantity: entry.quantity,
        variationSelections: entry.variationSelections || [],
      })),
    specialInstructions:
      typeof item.specialInstructions === 'string' ? item.specialInstructions.trim() : '',
  };
};

/** Dispatches one raw cart line to the matching resolver by its itemType. */
export const priceCartItem = (item) =>
  item.itemType === 'deal' ? priceDealItem(item) : priceProductItem(item);
