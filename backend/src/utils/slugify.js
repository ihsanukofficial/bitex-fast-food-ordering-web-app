/**
 * Converts a product title into a URL-safe slug. Kept separate from utils/toCartId.js
 * (which must stay byte-for-byte identical to the frontend's cart-selection id logic)
 * since this serves a different concern — a product's public URL segment — even though
 * the transformation happens to be the same.
 */
export const slugify = (value) =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
