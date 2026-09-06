import { createAdapter } from '@socket.io/redis-adapter';
import { parse as parseCookie } from 'cookie';
import { Server } from 'socket.io';
import { connectRedis } from '../config/redis.js';
import User from '../models/User.js';
import { AUTH_COOKIE_NAME, verifyAuthToken } from '../utils/jwt.js';

let io = null;

const ADMINS_ROOM = 'admins';

/**
 * Attaches Socket.IO to the HTTP server and authenticates each connection the same way
 * requireAuth does for REST requests: read the httpOnly auth cookie off the handshake,
 * verify the JWT, and load the user. Each socket then joins a room named after its own
 * user id, so server code can target "this user" without tracking socket ids itself.
 * Admin accounts additionally join a shared "admins" room for store-wide broadcasts
 * (new orders, status changes) that power the live admin dashboard.
 *
 * In clustered mode (multiple worker processes), a broadcast from emitToAdmins/
 * emitToUser only reaches sockets connected to *this* process's in-memory `io`
 * instance by default — an admin whose connection landed on a different worker would
 * silently miss it. The Redis adapter fixes this by publishing every broadcast
 * through Redis pub/sub so all workers relay it to their own local sockets, making
 * the "admins" room (and per-user rooms) effectively shared across the whole cluster
 * instead of scoped to one process.
 */
export const initSocket = async (httpServer, { useRedisAdapter = false } = {}) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
      credentials: true,
    },
  });

  if (useRedisAdapter) {
    const pubClient = await connectRedis();
    const subClient = pubClient.duplicate();
    await subClient.connect();
    io.adapter(createAdapter(pubClient, subClient));
  }

  io.use(async (socket, next) => {
    try {
      const cookieHeader = socket.handshake.headers.cookie;
      const cookies = cookieHeader ? parseCookie(cookieHeader) : {};
      const token = cookies[AUTH_COOKIE_NAME];
      if (!token) throw new Error('Unauthorized');

      const payload = verifyAuthToken(token);
      const user = await User.findById(payload.sub);
      if (!user || !user.active) throw new Error('Unauthorized');

      socket.userId = user._id.toString();
      socket.userRole = user.role;
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.join(socket.userId);
    if (socket.userRole === 'admin') socket.join(ADMINS_ROOM);
  });

  return io;
};

/**
 * Emits an event to every socket connection belonging to one user. A no-op before
 * initSocket runs or when the user has no live connection — callers treat delivery as
 * best-effort since the REST notification history is the durable record.
 */
export const emitToUser = (userId, event, payload) => {
  io?.to(userId.toString()).emit(event, payload);
};

/** Emits an event to every connected admin session, for live dashboard updates. */
export const emitToAdmins = (event, payload) => {
  io?.to(ADMINS_ROOM).emit(event, payload);
};
