import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AUTH_COOKIE_NAME, clearAuthCookie, setAuthCookie, signAuthToken, verifyAuthToken } from '../utils/jwt.js';

const PASSWORD_MIN_LENGTH = 8;

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  avatar: user.avatar,
  role: user.role,
  createdAt: user.createdAt,
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone = '' } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    throw new ApiError(400, 'Name, email, and password are required.');
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new ApiError(400, `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
  }

  const existing = await User.findOne({ email: email.trim().toLowerCase() });
  if (existing) throw new ApiError(409, 'An account with that email already exists.');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    phone: phone.trim(),
  });

  setAuthCookie(res, signAuthToken(user));
  logActivity({
    user,
    action: 'user.registered',
    description: `${user.name} created an account.`,
    targetType: 'user',
    targetId: user._id,
    targetLabel: user.name,
  });
  res.status(201).json({ user: toPublicUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email?.trim() || !password) {
    throw new ApiError(400, 'Email and password are required.');
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user || !user.active) throw new ApiError(401, 'Invalid email or password.');

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) throw new ApiError(401, 'Invalid email or password.');

  setAuthCookie(res, signAuthToken(user));
  logActivity({
    user,
    action: 'user.logged_in',
    description: `${user.name} logged in.`,
    targetType: 'user',
    targetId: user._id,
    targetLabel: user.name,
  });
  res.json({ user: toPublicUser(user) });
});

// This route runs without requireAuth (logout must always succeed, even with an
// expired/missing cookie), so the logged-out user is resolved leniently here — any
// failure just skips the log entry rather than blocking the logout itself.
export const logout = asyncHandler(async (req, res) => {
  clearAuthCookie(res);

  const token = req.cookies?.[AUTH_COOKIE_NAME];
  if (token) {
    try {
      const payload = verifyAuthToken(token);
      const user = await User.findById(payload.sub);
      if (user) {
        logActivity({
          user,
          action: 'user.logged_out',
          description: `${user.name} logged out.`,
          targetType: 'user',
          targetId: user._id,
          targetLabel: user.name,
        });
      }
    } catch {
      // Expired/invalid token — nothing meaningful to log.
    }
  }

  res.status(204).end();
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: toPublicUser(req.user) });
});

export { toPublicUser };
