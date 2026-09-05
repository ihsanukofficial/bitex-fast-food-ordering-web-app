/**
 * Shared cart constants and the variation/add-on slug helper. Cart state itself lives
 * in the backend (see CartContext) — this module only holds the small pieces every
 * cart-adjacent UI surface still needs directly.
 */
export const CART_ITEM_ADD_RESULT_EVENT = 'bitex:cart-item-add-result';
export const MAX_CART_ITEM_QUANTITY = 20;

/**
 * Converts user-facing variation and add-on labels into stable cart identifiers.
 * Must stay byte-for-byte identical to backend/src/utils/toCartId.js, since cart
 * payloads reference variations/addons by this slug.
 */
export const toCartId = (value) =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
