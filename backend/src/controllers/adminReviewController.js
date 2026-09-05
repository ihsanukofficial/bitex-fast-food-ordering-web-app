import DealSection from '../models/DealSection.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { findEmbeddedReview } from '../utils/reviewSync.js';

/** A deal lives inside its section's embedded array — resolve both by the deal's slug id. */
const findDealSectionAndDeal = async (dealId) => {
  const section = await DealSection.findOne({ 'deals.id': dealId });
  const deal = section?.deals.find((entry) => entry.id === dealId);
  return { section, deal };
};

/**
 * listReviews
 *
 * Every real customer review across products and deals, newest first, with just
 * enough denormalized detail (reviewer, product or deal) for the admin table — no
 * separate lookups needed client-side. A user, product, or deal can be gone by the
 * time an admin looks (an old order's product id going stale, in particular) without
 * breaking the list.
 */
export const listReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .sort({ createdAt: -1 })
    .populate('user', 'name email')
    .populate('product', 'title images slug');

  const dealIds = [...new Set(reviews.filter((review) => review.itemType === 'deal').map((review) => review.dealId))];
  const dealSections = dealIds.length
    ? await DealSection.find({ 'deals.id': { $in: dealIds } }).select('deals.id deals.name deals.image')
    : [];
  const dealById = new Map(
    dealSections.flatMap((section) => section.deals.map((deal) => [deal.id, deal])),
  );

  const shaped = reviews.map((review) => {
    const deal = review.itemType === 'deal' ? dealById.get(review.dealId) : null;

    return {
      _id: review._id.toString(),
      orderId: review.order.toString(),
      itemType: review.itemType,
      stars: review.stars,
      text: review.text,
      createdAt: review.createdAt,
      reviewer: review.user ? { name: review.user.name, email: review.user.email } : null,
      product: review.product
        ? { title: review.product.title, image: review.product.images?.[0] || '', slug: review.product.slug }
        : null,
      deal: deal ? { title: deal.name, image: deal.image || '' } : null,
    };
  });

  res.json({ reviews: shaped });
});

/**
 * deleteReview
 *
 * Admin moderation — unlike the customer-facing delete, this isn't scoped to the
 * requester owning the review, only to being an admin (enforced by this route's
 * requireAdmin middleware). Keeps the target's denormalized copy and aggregate rating
 * in sync the same way every other review mutation does.
 */
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.reviewId).populate('user', 'name');
  if (!review) throw new ApiError(404, 'Review not found.');

  let ratingsTarget;
  let section = null;
  let title = '';

  if (review.itemType === 'deal') {
    const found = await findDealSectionAndDeal(review.dealId);
    ratingsTarget = found.deal;
    section = found.section;
    title = found.deal?.name || '';
  } else {
    ratingsTarget = await Product.findById(review.product);
    title = ratingsTarget?.title || '';
  }

  if (ratingsTarget) {
    const embedded = findEmbeddedReview(ratingsTarget, review);
    if (embedded) {
      embedded.deleteOne();
      await (section || ratingsTarget).save();
    }
  }

  const reviewerName = review.user?.name || 'a customer';
  await review.deleteOne();

  logActivity({
    user: req.user,
    action: 'review.moderated',
    description: `${req.user.name} removed ${reviewerName}'s review of "${title || 'an item'}".`,
    targetType: 'review',
    targetId: review._id,
    targetLabel: title,
  });

  res.status(204).end();
});
