import ActivityLog from '../models/ActivityLog.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const HOUR_MS = 60 * 60 * 1000;

/**
 * Paginates by hour-long windows rather than page numbers — an admin browses the log
 * one hour at a time (or jumps straight to a specific year/month/day/hour), so a
 * window's bounds are always obvious and stable even as new entries keep arriving.
 */
export const listActivityLogs = asyncHandler(async (req, res) => {
  const requestedStart = req.query.start ? new Date(req.query.start) : new Date();
  if (Number.isNaN(requestedStart.getTime())) throw new ApiError(400, 'Invalid start time.');

  const windowStart = new Date(requestedStart);
  windowStart.setMinutes(0, 0, 0);
  const windowEnd = new Date(windowStart.getTime() + HOUR_MS);

  const logs = await ActivityLog.find({
    createdAt: { $gte: windowStart, $lt: windowEnd },
  }).sort({ createdAt: -1 });

  res.json({ logs, windowStart, windowEnd });
});
