import mongoose from 'mongoose';

/**
 * One document per user — just a set of product references, unlike Cart there's no
 * per-line configuration (variations, quantity) to track, so a single array is enough.
 */
const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    products: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model('Wishlist', wishlistSchema);
