import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema(
  {
    originalPrice: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    discountedPrice: { type: Number, required: true },
  },
  { _id: false },
);

const variationOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    originalPrice: { type: Number },
    discountPercentage: { type: Number, default: 0 },
    discountedPrice: { type: Number },
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
    price: { type: priceSchema, required: true },
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
 * discountedPrice is always derived here, never trusted from client input, so an admin
 * only ever sets originalPrice + discountPercentage and the two numbers can never drift
 * out of sync (a stale discountedPrice left over from a previous edit, a typo, etc.).
 */
const computeDiscountedPrice = (originalPrice, discountPercentage) => {
  const original = Number(originalPrice) || 0;
  const percentage = Math.min(100, Math.max(0, Number(discountPercentage) || 0));
  return Math.max(0, Math.round(original - (original * percentage) / 100));
};

/**
 * Mirrors catalog.js's createRatingSummary/createBasePrice: aggregate ratings, per-option
 * discounted prices, and the catalog-card base price are all derived, not hand-authored,
 * so they cannot drift from the underlying reviews/variation data an admin edits. Runs
 * pre-validate (not pre-save) so the computed discountedPrice already exists by the time
 * price.discountedPrice's `required` validator checks for it.
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

  // A storewide/base discount should apply to every variation option automatically —
  // an admin discounting the product shouldn't have to re-enter the same percentage
  // on each size or flavor. An option that sets its own discount always wins that
  // one instead. A real admin-set base price (originalPrice > 0) is never touched by
  // the "borrow the first option's price" branch below, so this stays the discount
  // the admin actually entered across every future edit — not whichever option
  // happened to be first the last time this saved, which is what let a single
  // option's own discount quietly hijack the base and stop propagating to the rest.
  const baseDiscountPercentage = Number(this.price?.discountPercentage) || 0;
  const hasOwnBasePrice = Number(this.price?.originalPrice) > 0;

  // Only an option the admin actually priced (originalPrice > 0) counts as "priced" —
  // otherwise every freshly-added option (which defaults to 0) would look priced and
  // could wrongly win the "first priced option" race below.
  this.variations.forEach((variation) => {
    variation.options.forEach((option) => {
      if (Number(option.originalPrice) > 0) {
        const effectiveDiscount = Number(option.discountPercentage) > 0 ? option.discountPercentage : baseDiscountPercentage;
        option.discountedPrice = computeDiscountedPrice(option.originalPrice, effectiveDiscount);
      } else {
        option.discountedPrice = undefined;
      }
    });
  });

  if (hasOwnBasePrice) {
    this.price.discountedPrice = computeDiscountedPrice(this.price.originalPrice, this.price.discountPercentage);
  } else {
    // No real base price was set — borrow the first priced variation option's own
    // numbers purely so the catalog card has something to display.
    const firstPricedOption = this.variations
      .flatMap((variation) => variation.options)
      .find((option) => option.discountedPrice !== undefined);

    if (firstPricedOption) {
      this.price = {
        originalPrice: firstPricedOption.originalPrice,
        discountPercentage: firstPricedOption.discountPercentage || 0,
        discountedPrice: firstPricedOption.discountedPrice,
      };
    } else if (this.price) {
      this.price.discountedPrice = computeDiscountedPrice(this.price.originalPrice, this.price.discountPercentage);
    }
  }

  next();
});

export default mongoose.model('Product', productSchema);
