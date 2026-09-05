import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    itemType: { type: String, enum: ['product', 'deal'], required: true },
    productId: { type: String },
    dealId: { type: String },
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
    quantity: { type: Number, required: true, default: 1 },
    specialInstructions: { type: String, default: '' },
  },
  { timestamps: true },
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model('Cart', cartSchema);
