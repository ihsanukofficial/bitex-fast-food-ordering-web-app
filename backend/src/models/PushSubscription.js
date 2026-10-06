import mongoose from 'mongoose';

/**
 * One browser's Web Push subscription for an admin account. The endpoint is unique
 * per browser profile, so re-subscribing from the same browser just updates the row.
 */
const pushSubscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    endpoint: { type: String, required: true, unique: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.model('PushSubscription', pushSubscriptionSchema);
