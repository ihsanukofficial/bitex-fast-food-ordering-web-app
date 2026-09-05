import mongoose from 'mongoose';

/**
 * The bookkeeping record for "has this delivered order line been reviewed yet" — kept
 * as its own collection (rather than inferred from the target's own ratings.reviews)
 * so that check is a single indexed query instead of a scan across every product or
 * deal a user has ever ordered. The review's display copy is denormalized into the
 * target Product's or deal's ratings.reviews array at creation time so the existing
 * rating-aggregation pre-validate hook (see Product.js / DealSection.js) recomputes
 * overallRating/totalReviews/distribution the same way it always has — this collection
 * never needs its own aggregation logic.
 */
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    itemType: { type: String, enum: ['product', 'deal'], default: 'product', required: true },
    // Exactly one of these is set, chosen by itemType — mirrors Order/Cart's own
    // itemType-discriminated productId/dealId pair.
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    dealId: { type: String },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    orderItemIndex: { type: Number, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

reviewSchema.index({ order: 1, orderItemIndex: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
