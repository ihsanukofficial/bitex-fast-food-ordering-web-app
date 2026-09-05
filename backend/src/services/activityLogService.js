import ActivityLog from '../models/ActivityLog.js';

/**
 * Records one activity-log entry. Fire-and-forget by convention (callers don't await
 * this) and never throws — a logging hiccup must never break the actual action it's
 * recording, mirroring how notifyOrderStatus treats notification delivery as
 * best-effort against the real mutation it's attached to.
 */
export const logActivity = async ({ user, action, description, targetType = '', targetId = '', targetLabel = '' }) => {
  try {
    await ActivityLog.create({
      user: user?._id,
      userName: user?.name || 'Unknown',
      userEmail: user?.email || '',
      userRole: user?.role || 'user',
      action,
      description,
      targetType,
      targetId: targetId ? String(targetId) : '',
      targetLabel,
    });
  } catch (error) {
    console.error('Failed to record activity log:', error);
  }
};
