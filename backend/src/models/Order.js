import mongoose from 'mongoose';

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
  'cancelled',
];

const orderItemSchema = new mongoose.Schema(
  {
    itemType: { type: String, enum: ['product', 'deal'], required: true },
    productId: { type: String },
    dealId: { type: String },
    title: { type: String, required: true },
    image: { type: String, default: '' },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
    selections: {
      variations: {
        type: [{ variationId: String, optionId: String, _id: false }],
        default: [],
      },
      addons: {
        type: [{ addonId: String, quantity: Number, _id: false }],
        default: [],
      },
    },
    specialInstructions: { type: String, default: '' },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    promoCode: { type: String, default: '' },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    delivery: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, default: '' },
      address: { type: String, required: true },
      instructions: { type: String, default: '' },
    },
    status: { type: String, enum: ORDER_STATUSES, default: 'pending' },
  },
  { timestamps: true },
);

export default mongoose.model('Order', orderSchema);
