import mongoose from 'mongoose';

const dealItemVariationSelectionSchema = new mongoose.Schema(
  {
    variationName: { type: String, required: true },
    optionLabel: { type: String, required: true },
  },
  { _id: false },
);

const dealItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    // Which of the product's own variation options this deal bundles — e.g. a deal
    // including a pizza always as the "Large" size, so the deal listing can say so
    // instead of leaving customers to guess which option they'd actually receive.
    variationSelections: { type: [dealItemVariationSelectionSchema], default: [] },
  },
  { _id: false },
);

const dealReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewerName: { type: String, required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  orderItemIndex: { type: Number, required: true },
  stars: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const dealRatingsSchema = new mongoose.Schema(
  {
    overallRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    distribution: {
      one: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      five: { type: Number, default: 0 },
    },
    reviews: { type: [dealReviewSchema], default: [] },
  },
  { _id: false },
);

const dealSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    price: { type: Number, required: true },
    items: { type: [dealItemSchema], default: [] },
    ratings: { type: dealRatingsSchema, default: () => ({}) },
  },
  { _id: false },
);

const dealSectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    navigationLabel: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    icon: { type: String, default: '' },
    accent: { type: String, default: '' },
    tint: { type: String, default: '' },
    navigationAccent: { type: String, default: '' },
    order: { type: Number, default: 0 },
    deals: { type: [dealSchema], default: [] },
  },
  { timestamps: true },
);

const RATING_LABELS = ['one', 'two', 'three', 'four', 'five'];

/**
 * Mirrors Product.js's own rating-aggregation hook: each deal's overallRating,
 * totalReviews, and distribution are always derived from its embedded reviews, never
 * hand-edited, so admin edits to a deal (name/price/items) can never leave them stale.
 */
dealSectionSchema.pre('validate', function computeDealRatings(next) {
  this.deals.forEach((deal) => {
    const reviews = deal.ratings?.reviews || [];
    const distribution = Object.fromEntries(RATING_LABELS.map((label) => [label, 0]));
    reviews.forEach((review) => {
      const label = RATING_LABELS[review.stars - 1];
      if (label) distribution[label] += 1;
    });
    const totalReviews = reviews.length;
    const overallRating = totalReviews
      ? Number((reviews.reduce((total, review) => total + review.stars, 0) / totalReviews).toFixed(1))
      : 0;
    deal.ratings.totalReviews = totalReviews;
    deal.ratings.overallRating = overallRating;
    deal.ratings.distribution = distribution;
  });

  next();
});

export default mongoose.model('DealSection', dealSectionSchema);
