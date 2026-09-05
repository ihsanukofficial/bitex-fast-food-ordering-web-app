/**
 * Converts user-facing variation and add-on labels into stable cart identifiers.
 * Must stay byte-for-byte identical to src/utils/cartStorage.js's toCartId on the
 * frontend, since cart payloads reference variations/addons by this slug.
 */
export const toCartId = (value) =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
