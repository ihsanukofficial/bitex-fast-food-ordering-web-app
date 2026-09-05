import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AUTH_COOKIE_NAME, verifyAuthToken } from '../utils/jwt.js';

/**
 * Populates req.user from the auth cookie. Rejects when the cookie is missing,
 * invalid, or the account has since been deactivated.
 */
export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME];
  if (!token) throw new ApiError(401, 'You must be logged in.');

  let payload;
  try {
    payload = verifyAuthToken(token);
  } catch {
    throw new ApiError(401, 'Your session has expired. Please log in again.');
  }

  const user = await User.findById(payload.sub);
  if (!user || !user.active) {
    throw new ApiError(401, 'Your session is no longer valid. Please log in again.');
  }

  req.user = user;
  next();
});

/**
 * Must run after requireAuth. Restricts a route to admin-role accounts.
 */
export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    throw new ApiError(403, 'Admin access is required for this action.');
  }
  next();
};
