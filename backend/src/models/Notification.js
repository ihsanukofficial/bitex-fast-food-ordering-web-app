import mongoose from 'mongoose';

export const NOTIFICATION_TYPES = [
  'order_placed',
  'order_confirmed',
  'order_preparing',
  'order_out_for_delivery',
  'order_delivered',
  'order_cancelled',
  'admin_message',
];

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: NOTIFICATION_TYPES, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model('Notification', notificationSchema);
