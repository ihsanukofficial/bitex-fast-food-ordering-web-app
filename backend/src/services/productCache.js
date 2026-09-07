import { connectRedis } from '../config/redis.js';

const CACHE_KEY = 'cache:products:all';
// The catalog changes rarely (an admin edit, not customer traffic), so a short TTL
// buys most of the caching benefit under read-heavy load while capping how stale an
// uninvalidated read could ever be if a cache invalidation is ever missed.
const CACHE_TTL_SECONDS = 60;

/**
 * Caches only the single most common request shape — every product, no filter, no
 * pagination — since that's exactly what the storefront's menu/catalog fetch sends.
 * Filtered or paginated requests go straight to MongoDB: they're already cheaper
 * (narrower result sets) and caching every filter/search combination would trade a
 * bounded cache for an unbounded, rarely-reused one.
 *
 * Backed by Redis rather than an in-process Map so every clustered worker shares one
 * cache and one invalidation — a plain in-memory cache would leave every worker but
 * the one that handled an admin's edit serving stale data until its own TTL expired.
 * Failures are swallowed and logged: Redis being unreachable should degrade this
 * endpoint back to querying MongoDB directly, never take it down.
 */
// connectRedis() already logs the first real connection failure and then throws a
// tagged, silent error for every request made during its cooldown window — logging
// again here would just repeat that same line once per request while Redis is down.
const logCacheError = (message, error) => {
  if (error.code === 'REDIS_COOLDOWN') return;
  console.error(message, error.message);
};

export const getCachedAllProducts = async () => {
  try {
    const client = await connectRedis();
    const raw = await client.get(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    logCacheError('Product cache read failed, falling back to MongoDB:', error);
    return null;
  }
};

export const setCachedAllProducts = async (products) => {
  try {
    const client = await connectRedis();
    await client.set(CACHE_KEY, JSON.stringify(products), 'EX', CACHE_TTL_SECONDS);
  } catch (error) {
    logCacheError('Product cache write failed:', error);
  }
};

/** Called on every product create/update/delete so an admin's change is visible immediately. */
export const invalidateProductsCache = async () => {
  try {
    const client = await connectRedis();
    await client.del(CACHE_KEY);
  } catch (error) {
    logCacheError('Product cache invalidation failed:', error);
  }
};
