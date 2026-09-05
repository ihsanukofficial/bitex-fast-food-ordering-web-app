import Cart from '../models/Cart.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { clampQuantity, priceCartItem } from '../utils/cartPricing.js';

const findOrCreateCart = async (userId) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { new: true, upsert: true },
  );
  return cart;
};

const sortByConfiguration = (first, second) =>
  JSON.stringify(first).localeCompare(JSON.stringify(second));

/**
 * Produces an order-independent identity for a configured cart line, so adding an
 * already-present configuration increases its quantity instead of duplicating it.
 * Mirrors the frontend's (now retired) localStorage configuration key.
 */
const getConfigurationKey = (item) => {
  if (item.itemType === 'deal') {
    return JSON.stringify({ itemType: 'deal', dealId: item.dealId });
  }

  const variations = [...(item.selections?.variations || [])]
    .map(({ variationId, optionId }) => ({ variationId, optionId }))
    .sort(sortByConfiguration);
  const addons = [...(item.selections?.addons || [])]
    .map(({ addonId, quantity }) => ({ addonId, quantity }))
    .sort(sortByConfiguration);

  return JSON.stringify({
    itemType: 'product',
    productId: item.productId,
    selections: { variations, addons },
    specialInstructions: item.specialInstructions?.trim() || '',
  });
};

const normalizeVariations = (variations) =>
  (Array.isArray(variations) ? variations : [])
    .filter(
      (variation) =>
        variation && typeof variation.variationId === 'string' && typeof variation.optionId === 'string',
    )
    .map((variation) => ({ variationId: variation.variationId, optionId: variation.optionId }));

const normalizeAddons = (addons) =>
  (Array.isArray(addons) ? addons : [])
    .filter((addon) => addon && typeof addon.addonId === 'string')
    .map((addon) => ({ addonId: addon.addonId, quantity: clampQuantity(addon.quantity) }));

/** Validates and shapes an add-to-cart request body into the raw, persisted item form. */
const buildRawItem = (body) => {
  if (body?.itemType === 'deal') {
    if (typeof body.dealId !== 'string' || !body.dealId.trim()) {
      throw new ApiError(400, 'A deal identifier is required.');
    }
    return {
      itemType: 'deal',
      dealId: body.dealId,
      quantity: clampQuantity(body.quantity),
      specialInstructions:
        typeof body.specialInstructions === 'string' ? body.specialInstructions.trim() : '',
    };
  }

  if (typeof body?.productId !== 'string' || !body.productId.trim()) {
    throw new ApiError(400, 'A product identifier is required.');
  }

  return {
    itemType: 'product',
    productId: body.productId,
    selections: {
      variations: normalizeVariations(body.selections?.variations),
      addons: normalizeAddons(body.selections?.addons),
    },
    quantity: clampQuantity(body.quantity),
    specialInstructions:
      typeof body.specialInstructions === 'string' ? body.specialInstructions.trim() : '',
  };
};

/**
 * Re-prices every persisted line against live catalog data for the response, silently
 * dropping (and persisting the removal of) any line whose product or deal no longer
 * resolves — the database stays the single source of truth for what a cart contains.
 */
const priceCartForResponse = async (cart) => {
  const resolved = await Promise.all(
    cart.items.map(async (item) => {
      try {
        return { raw: item, priced: await priceCartItem(item) };
      } catch {
        return null;
      }
    }),
  );
  const valid = resolved.filter(Boolean);

  if (valid.length !== cart.items.length) {
    cart.items = valid.map(({ raw }) => raw);
    await cart.save();
  }

  const items = valid.map(({ raw, priced }) => ({
    id: raw._id.toString(),
    itemType: priced.itemType,
    productId: priced.productId,
    dealId: priced.dealId,
    title: priced.title,
    image: priced.image,
    unitPrice: priced.unitPrice,
    quantity: priced.quantity,
    lineTotal: priced.lineTotal,
    selections: priced.display,
    dealItems: priced.dealItems,
    specialInstructions: priced.specialInstructions,
  }));
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return { items, subtotal, itemCount };
};

export const getMyCart = asyncHandler(async (req, res) => {
  const cart = await findOrCreateCart(req.user._id);
  res.json({ cart: await priceCartForResponse(cart) });
});

export const addCartItem = asyncHandler(async (req, res) => {
  const rawItem = buildRawItem(req.body);
  // Reject configurations that no longer resolve before ever touching persisted state.
  const priced = await priceCartItem(rawItem);

  const cart = await findOrCreateCart(req.user._id);
  const configurationKey = getConfigurationKey(rawItem);
  const existing = cart.items.find((item) => getConfigurationKey(item) === configurationKey);

  let status;
  let resultItem;
  if (existing) {
    const previousQuantity = existing.quantity;
    existing.quantity = clampQuantity(existing.quantity + rawItem.quantity);
    status = existing.quantity === previousQuantity ? 'limit-reached' : 'quantity-increased';
    resultItem = existing;
  } else {
    cart.items.push(rawItem);
    status = 'added';
    resultItem = cart.items[cart.items.length - 1];
  }

  await cart.save();

  res.status(201).json({
    cart: await priceCartForResponse(cart),
    result: {
      status,
      itemId: resultItem._id.toString(),
      title: priced.title,
      quantity: rawItem.quantity,
      cartQuantity: resultItem.quantity,
    },
  });
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const cart = await findOrCreateCart(req.user._id);
  const item = cart.items.id(req.params.itemId);
  if (!item) throw new ApiError(404, 'Cart item not found.');

  item.quantity = clampQuantity(req.body.quantity);
  await cart.save();
  res.json({ cart: await priceCartForResponse(cart) });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await findOrCreateCart(req.user._id);
  const item = cart.items.id(req.params.itemId);
  if (!item) throw new ApiError(404, 'Cart item not found.');

  item.deleteOne();
  await cart.save();
  res.json({ cart: await priceCartForResponse(cart) });
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await findOrCreateCart(req.user._id);
  cart.items = [];
  await cart.save();
  res.json({ cart: await priceCartForResponse(cart) });
});
