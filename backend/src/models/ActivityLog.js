import mongoose from 'mongoose';

/**
 * An append-only audit trail of who did what across the store. Actor details are
 * denormalized (name/email/role captured at the time of the action) so an entry stays
 * meaningful even if the account is later renamed, demoted, or deleted — the same
 * reasoning Review.reviewerName already uses for the public review list.
 */
const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    userEmail: { type: String, default: '' },
    userRole: { type: String, enum: ['user', 'admin'], default: 'user' },
    action: { type: String, required: true },
    description: { type: String, required: true },
    targetType: { type: String, default: '' },
    targetId: { type: String, default: '' },
    targetLabel: { type: String, default: '' },
  },
  { timestamps: true },
);

activityLogSchema.index({ createdAt: -1 });

export default mongoose.model('ActivityLog', activityLogSchema);
