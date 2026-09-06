import Redis from 'ioredis';

let client = null;

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
  });
  client.on('error', (error) => console.error('Redis client error:', error.message));
  return client;
};

export const connectRedis = async () => {
  const redisClient = getRedisClient();
  if (redisClient.status === 'wait' || redisClient.status === 'end') await redisClient.connect();
  return redisClient;
};
