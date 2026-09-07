import Redis from 'ioredis';

let client = null;
let hasLoggedError = false;
let lastFailedConnectAt = 0;
// How long connectRedis() waits after a failed connection attempt before trying again,
// instead of retrying (and re-logging) on every single request while Redis is down.
const RECONNECT_COOLDOWN_MS = 15_000;

/**
 * Lazily creates one shared Redis connection for the whole worker process — used both
 * as the Socket.IO adapter's transport (so real-time broadcasts reach every clustered
 * worker, not just the one that handled the triggering request) and as a small
 * response cache for expensive read endpoints.
 *
 * ioredis rather than the official `redis` package: the latter negotiates RESP3 via a
 * `HELLO` command on every connect, which older/Windows-compatible Redis builds (e.g.
 * Redis 5.x) don't implement — that handshake fails outright and ioredis speaks plain
 * RESP2 by default, working against both old and new servers.
 */
export const getRedisClient = () => {
  if (client) return client;

  client = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
    // Let callers decide when to fail: a lazy, retrying connection means a request
    // that touches Redis while it's briefly unreachable gets one clear error instead
    // of the whole process refusing to start.
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    // Give up after a few quick attempts instead of ioredis's default indefinite
    // backoff loop — with Redis genuinely unreachable (e.g. none running in local
    // dev), an unbounded retryStrategy fires an 'error' event per retry, forever.
    // connectRedis() below re-attempts on its own slower cooldown instead.
    retryStrategy: (times) => (times > 2 ? null : 300),
  });
  client.on('error', (error) => {
    // Every retry attempt re-emits 'error' — log only the first one per outage so a
    // Redis-down period produces one line, not a repeating flood.
    if (hasLoggedError) return;
    hasLoggedError = true;
    console.error('Redis unavailable, caching/pub-sub will fall back until it reconnects:', error.message);
  });
  client.on('ready', () => {
    hasLoggedError = false;
  });
  return client;
};

export const connectRedis = async () => {
  const redisClient = getRedisClient();
  if (redisClient.status !== 'wait' && redisClient.status !== 'end') return redisClient;

  if (redisClient.status === 'end' && Date.now() - lastFailedConnectAt < RECONNECT_COOLDOWN_MS) {
    const error = new Error('Redis unavailable (cooling down before retrying).');
    error.code = 'REDIS_COOLDOWN';
    throw error;
  }

  try {
    await redisClient.connect();
  } catch (error) {
    lastFailedConnectAt = Date.now();
    throw error;
  }
  return redisClient;
};
