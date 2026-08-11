/**
 * Cart persistence, normalization, configuration matching, and update events.
 * All public mutations pass through this module so independent UI surfaces
 * observe the same sanitized cart state.
 */
export const CART_STORAGE_KEY = 'bitex-cart';
export const CART_UPDATED_EVENT = 'bitex:cart-updated';
export const CART_ITEM_ADD_RESULT_EVENT = 'bitex:cart-item-add-result';
export const MAX_CART_ITEM_QUANTITY = 20;

let inMemoryCart = [];
// Preserve cart behavior for the session when browser storage is unavailable.
let useMemoryFallback = false;

/**
 * Converts user-facing variation and add-on labels into stable cart identifiers.
 */
export const toCartId = (value) =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Coerces a requested quantity to the supported integer range.
 */
export const clampCartQuantity = (quantity) => {
  const numericQuantity = Number(quantity);

  if (!Number.isFinite(numericQuantity)) return 1;

  return Math.min(
    MAX_CART_ITEM_QUANTITY,
    Math.max(1, Math.trunc(numericQuantity)),
  );
};

/**
 * Discards malformed variation selections before they reach persisted cart state.
 */
const normalizeVariations = (variations) =>
  (Array.isArray(variations) ? variations : [])
    .filter(
      (variation) =>
        variation &&
        typeof variation.variationId === 'string' &&
        typeof variation.optionId === 'string',
    )
    .map((variation) => ({
      variationId: variation.variationId,
      optionId: variation.optionId,
    }));

/**
 * Discards malformed add-ons and normalizes their quantities for persistence.
 */
const normalizeAddons = (addons) =>
  (Array.isArray(addons) ? addons : [])
    .filter(
      (addon) => addon && typeof addon.addonId === 'string',
    )
    .map((addon) => ({
      addonId: addon.addonId,
      quantity: clampCartQuantity(addon.quantity),
    }));

/**
 * Converts an unknown stored value into the canonical product or deal cart shape.
 */
const normalizeCartItem = (item) => {
  if (!item || typeof item !== 'object') return null;

  if (item.itemType === 'deal') {
    if (typeof item.dealId !== 'string' || !item.dealId.trim()) return null;

    return {
      itemType: 'deal',
      dealId: item.dealId,
      quantity: clampCartQuantity(item.quantity),
    };
  }

  if (typeof item.productId !== 'string' || !item.productId.trim()) return null;

  return {
    productId: item.productId,
    selections: {
      variations: normalizeVariations(item.selections?.variations),
      addons: normalizeAddons(item.selections?.addons),
    },
    quantity: clampCartQuantity(item.quantity),
    specialInstructions:
      typeof item.specialInstructions === 'string'
        ? item.specialInstructions.trim()
        : '',
  };
};

/**
 * Sanitizes a complete cart and removes entries that cannot be safely hydrated.
 */
const normalizeCart = (cart) =>
  (Array.isArray(cart) ? cart : [])
    .map(normalizeCartItem)
    .filter(Boolean);

/**
 * Reads and validates persisted cart state.
 * Falls back to session memory when a previous storage write was blocked.
 */
export const getCart = () => {
  if (useMemoryFallback) return inMemoryCart;

  try {
    const storedValue = localStorage.getItem(CART_STORAGE_KEY);
    const storedCart = storedValue ? JSON.parse(storedValue) : [];
    inMemoryCart = normalizeCart(storedCart);
    return inMemoryCart;
  } catch {
    inMemoryCart = [];

    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      useMemoryFallback = false;
    } catch {
      useMemoryFallback = true;
    }

    return inMemoryCart;
  }
};

/**
 * Persists normalized cart state and broadcasts it to mounted UI subscribers.
 * Storage failures retain the normalized value in memory for the active session.
 */
export const saveCart = (cart) => {
  const normalizedCart = normalizeCart(cart);
  inMemoryCart = normalizedCart;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizedCart));
    useMemoryFallback = false;
  } catch {
    useMemoryFallback = true;
  }

  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, { detail: normalizedCart }),
  );
  return normalizedCart;
};

/**
 * Provides deterministic ordering for configuration-key serialization.
 */
const sortByConfiguration = (first, second) =>
  JSON.stringify(first).localeCompare(JSON.stringify(second));

/**
 * Produces an order-independent identity for a configured product.
 * Special instructions remain part of the identity so distinct requests do not merge.
 */
const getConfigurationKey = (item) => {
  const variations = [...(item.selections?.variations || [])].sort(
    sortByConfiguration,
  );
  const addons = [...(item.selections?.addons || [])].sort(
    sortByConfiguration,
  );

  return JSON.stringify({
    productId: item.productId,
    selections: { variations, addons },
    specialInstructions: item.specialInstructions?.trim() || '',
  });
};

/**
 * Broadcasts purchase feedback without coupling cart persistence to toast UI.
 */
const dispatchCartItemAddResult = (detail) => {
  window.dispatchEvent(
    new CustomEvent(CART_ITEM_ADD_RESULT_EVENT, { detail }),
  );
};

/**
 * Adds a configured product or merges it with an identical cart configuration.
 * Emits feedback describing whether the entry was added, incremented, or capped.
 */
export const addCartItem = ({
  productId,
  productName,
  variations = [],
  addons = [],
  quantity = 1,
  specialInstructions = '',
}) => {
  if (!productId) return [];

  const cartItem = {
    productId,
    selections: {
      variations,
      addons,
    },
    quantity: clampCartQuantity(quantity),
    specialInstructions:
      typeof specialInstructions === 'string'
        ? specialInstructions.trim()
        : '',
  };

  const cart = getCart();
  const configurationKey = getConfigurationKey(cartItem);
  const existingIndex = cart.findIndex(
    (item) => getConfigurationKey(item) === configurationKey,
  );

  if (existingIndex >= 0) {
    const mergedQuantity = clampCartQuantity(
      cart[existingIndex].quantity + cartItem.quantity,
    );
    const nextCart = cart.map((item, index) =>
      index === existingIndex
        ? { ...item, quantity: mergedQuantity }
        : item,
    );
    const savedCart = saveCart(nextCart);

    dispatchCartItemAddResult({
      status:
        mergedQuantity === cart[existingIndex].quantity
          ? 'limit-reached'
          : 'quantity-increased',
      productId,
      productName,
      quantity: cartItem.quantity,
      cartQuantity: savedCart[existingIndex].quantity,
    });
    return savedCart;
  }

  const nextCart = [...cart, cartItem];
  const savedCart = saveCart(nextCart);
  dispatchCartItemAddResult({
    status: 'added',
    productId,
    productName,
    quantity: cartItem.quantity,
  });

  return savedCart;
};

/**
 * Adds a deal or increments the existing entry for the same deal identifier.
 */
export const addDealToCart = ({
  dealId,
  dealName,
  quantity = 1,
}) => {
  if (!dealId) return [];

  const nextQuantity = clampCartQuantity(quantity);
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (item) => item.itemType === 'deal' && item.dealId === dealId,
  );

  if (existingIndex >= 0) {
    const mergedQuantity = clampCartQuantity(
      cart[existingIndex].quantity + nextQuantity,
    );
    const nextCart = cart.map((item, index) =>
      index === existingIndex
        ? { ...item, quantity: mergedQuantity }
        : item,
    );
    const savedCart = saveCart(nextCart);

    dispatchCartItemAddResult({
      status:
        mergedQuantity === cart[existingIndex].quantity
          ? 'limit-reached'
          : 'quantity-increased',
      productName: dealName,
      quantity: nextQuantity,
      cartQuantity: savedCart[existingIndex].quantity,
    });
    return savedCart;
  }

  const nextCart = [
    ...cart,
    {
      itemType: 'deal',
      dealId,
      quantity: nextQuantity,
    },
  ];
  const savedCart = saveCart(nextCart);

  dispatchCartItemAddResult({
    status: 'added',
    productName: dealName,
    quantity: nextQuantity,
  });
  return savedCart;
};

/**
 * Updates one cart entry by its persisted order while enforcing quantity limits.
 */
export const updateCartItemQuantity = (itemIndex, quantity) => {
  const nextQuantity = clampCartQuantity(quantity);
  return saveCart(
    getCart().map((item, index) =>
      index === itemIndex ? { ...item, quantity: nextQuantity } : item,
    ),
  );
};

/**
 * Removes one cart entry by its persisted order.
 */
export const removeCartItem = (itemIndex) =>
  saveCart(getCart().filter((_, index) => index !== itemIndex));

/**
 * Removes all persisted cart entries and notifies subscribers.
 */
export const clearCart = () => saveCart([]);
