import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
  },
  { _id: false },
);

const variationOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    price: { type: Number },
    discountPercentage: { type: Number, default: 0 },
  },
  { _id: false },
);

const variationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: { type: [variationOptionSchema], default: [] },
  },
  { _id: false },
);

const addonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false },
);

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewerName: { type: String, required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  orderItemIndex: { type: Number, required: true },
  stars: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const ratingsSchema = new mongoose.Schema(
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
    reviews: { type: [reviewSchema], default: [] },
  },
  { _id: false },
);

const nutritionSchema = new mongoose.Schema(
  { calories: { type: Number } },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    categoryId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    shortDescription: { type: String, default: '' },
    longDescription: { type: String, default: '' },
    pricingType: { type: String, enum: ['simple', 'variation'], required: true },
    price: { type: priceSchema, required: false, default: null },
    variations: { type: [variationSchema], default: [] },
    addons: { type: [addonSchema], default: [] },
    ingredients: { type: [String], default: [] },
    allergens: { type: [String], default: [] },
    nutrition: { type: nutritionSchema, default: () => ({}) },
    spiceLevel: { type: Number, default: 0 },
    preparationTime: { type: String, default: '' },
    available: { type: Boolean, default: true },
    badges: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    ratings: { type: ratingsSchema, default: () => ({}) },
  },
  { timestamps: true },
);

const RATING_LABELS = ['one', 'two', 'three', 'four', 'five'];

/**
 * Aggregate rating metadata is derived, not hand-authored, so it cannot drift from the
 * underlying reviews an admin edits. Pricing is no longer derived here — pricingType
 * makes the authoritative price explicit (product.price for "simple", the selected
 * variation option for "variation"), so there is nothing left to compute or borrow.
 */
productSchema.pre('validate', function computeDerivedFields(next) {
  const reviews = this.ratings?.reviews || [];
  const distribution = Object.fromEntries(RATING_LABELS.map((label) => [label, 0]));
  reviews.forEach((review) => {
    const label = RATING_LABELS[review.stars - 1];
    if (label) distribution[label] += 1;
  });
  const totalReviews = reviews.length;
  const overallRating = totalReviews
    ? Number((reviews.reduce((total, review) => total + review.stars, 0) / totalReviews).toFixed(1))
    : 0;
  this.ratings.totalReviews = totalReviews;
  this.ratings.overallRating = overallRating;
  this.ratings.distribution = distribution;

  next();
});

export default mongoose.model('Product', productSchema);
