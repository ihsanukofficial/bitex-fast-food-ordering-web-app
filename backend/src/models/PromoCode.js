import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
    // 'all' (default) discounts the whole order; 'specific' discounts only the cart
    // lines matching `products`/`deals` below — everything else in the cart is
    // untouched by this code.
    appliesTo: { type: String, enum: ['all', 'specific'], default: 'all' },
    products: { type: [mongoose.Schema.Types.ObjectId], ref: 'Product', default: [] },
    // Deals aren't a top-level collection — each lives as an embedded subdocument
    // inside a DealSection, identified by its own slug-like string `id`.
    deals: { type: [String], default: [] },
    // null means unlimited. usageCount increments once per order the code is actually
    // applied to (see orderController.createOrder) — never on a cart-side preview.
    usageLimit: { type: Number, default: null, min: 1 },
    usageCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('PromoCode', promoCodeSchema);
