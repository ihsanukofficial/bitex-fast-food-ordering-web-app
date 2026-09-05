import mongoose from 'mongoose';
import DealSection from '../models/DealSection.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { logActivity } from '../services/activityLogService.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { findEmbeddedReview } from '../utils/reviewSync.js';

/**
 * "Ahmed Khan" -> "Ahmed K." — keeps a reviewer recognizable on the public product
 * page without publishing a customer's full name there.
 */
const toDisplayName = (fullName) => {
  const parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'BiteX Customer';
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
};

/** Shared by create and update — same rules, so a review can't be edited into invalid shape. */
const validateStarsAndText = (stars, text) => {
  const numericStars = Number(stars);
  if (!Number.isInteger(numericStars) || numericStars < 1 || numericStars > 5) {
    throw new ApiError(400, 'Rating must be between 1 and 5 stars.');
  }
  const trimmedText = typeof text === 'string' ? text.trim() : '';
  if (trimmedText.length < 3) {
    throw new ApiError(400, 'Please write a short review before submitting.');
  }
  return { numericStars, trimmedText };
};

const toReviewResponse = (review) => ({
  _id: review._id.toString(),
  orderId: review.order.toString(),
  itemIndex: review.orderItemIndex,
  stars: review.stars,
  text: review.text,
  createdAt: review.createdAt,
});

/** A deal lives inside its section's embedded array — resolve both by the deal's slug id. */
const findDealSectionAndDeal = async (dealId) => {
  const section = await DealSection.findOne({ 'deals.id': dealId });
  const deal = section?.deals.find((entry) => entry.id === dealId);
  return { section, deal };
};

/**
 * Resolves an order line to the document its rating aggregate lives on — a Product
 * document for a product line, or a deal subdocument (plus its owning section, since
 * that's what actually needs saving) for a deal line.
 */
const resolveReviewTarget = async (item) => {
  if (item.itemType === 'product') {
    const product = await Product.findById(item.productId);
    if (!product) throw new ApiError(404, 'This product is no longer available to review.');
    return { ratingsTarget: product, section: null, title: product.title };
  }

  if (item.itemType === 'deal') {
    const { section, deal } = await findDealSectionAndDeal(item.dealId);
    if (!deal) throw new ApiError(404, 'This deal is no longer available to review.');
    return { ratingsTarget: deal, section, title: deal.name };
  }

  throw new ApiError(400, 'This item cannot be reviewed.');
};

/**
 * createReview
 *
 * A review can only be left by the order's own owner, only for a delivered order,
 * and only once per order line — every constraint is re-checked server-side against
 * the authenticated user's own order, never trusted from the client. The Review
 * document is the durable "already reviewed" record; the same review is also
 * denormalized onto the target product or deal so its existing pre-validate hook
 * recomputes overallRating/totalReviews/distribution exactly as it already does for
 * every other edit.
 */
export const createReview = asyncHandler(async (req, res) => {
  const { orderId, itemIndex, stars, text } = req.body;

  if (!mongoose.isValidObjectId(orderId)) throw new ApiError(400, 'Invalid order.');
  const numericIndex = Number(itemIndex);
  if (!Number.isInteger(numericIndex) || numericIndex < 0) {
    throw new ApiError(400, 'Invalid order item.');
  }
  const { numericStars, trimmedText } = validateStarsAndText(stars, text);

  const order = await Order.findOne({ _id: orderId, user: req.user._id });
  if (!order) throw new ApiError(404, 'Order not found.');
  if (order.status !== 'delivered') {
    throw new ApiError(400, 'You can only review items from a delivered order.');
  }

  const item = order.items[numericIndex];
  if (!item) throw new ApiError(400, 'Invalid order item.');

  const { ratingsTarget, section, title } = await resolveReviewTarget(item);

  let review;
  try {
    review = await Review.create({
      user: req.user._id,
      itemType: item.itemType,
      product: item.itemType === 'product' ? ratingsTarget._id : undefined,
      dealId: item.itemType === 'deal' ? item.dealId : undefined,
      order: order._id,
      orderItemIndex: numericIndex,
      stars: numericStars,
      text: trimmedText,
    });
  } catch (error) {
    if (error.code === 11000) throw new ApiError(409, 'You have already reviewed this item.');
    throw error;
  }

  ratingsTarget.ratings.reviews.push({
    user: req.user._id,
    reviewerName: toDisplayName(req.user.name),
    order: order._id,
    orderItemIndex: numericIndex,
    stars: numericStars,
    text: trimmedText,
  });
  await (section || ratingsTarget).save();

  logActivity({
    user: req.user,
    action: 'review.created',
    description: `${req.user.name} reviewed "${title}" (${numericStars}★).`,
    targetType: 'review',
    targetId: review._id,
    targetLabel: title,
  });

  res.status(201).json({ review: toReviewResponse(review) });
});

/**
 * updateReview
 *
 * Lets a reviewer change their own star rating and text after the fact. Ownership is
 * re-checked against the authenticated user (findOne with both _id and user, never a
 * bare findById), and the product's or deal's denormalized copy is updated in lockstep
 * so the aggregate rating stays correct.
 */
export const updateReview = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.reviewId)) throw new ApiError(400, 'Invalid review.');
  const { numericStars, trimmedText } = validateStarsAndText(req.body.stars, req.body.text);

  const review = await Review.findOne({ _id: req.params.reviewId, user: req.user._id });
  if (!review) throw new ApiError(404, 'Review not found.');

  review.stars = numericStars;
  review.text = trimmedText;
  await review.save();

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

  const embedded = ratingsTarget && findEmbeddedReview(ratingsTarget, review);
  if (embedded) {
    embedded.stars = numericStars;
    embedded.text = trimmedText;
    await (section || ratingsTarget).save();
  }

  logActivity({
    user: req.user,
    action: 'review.updated',
    description: `${req.user.name} updated their review for "${title || 'an item'}".`,
    targetType: 'review',
    targetId: review._id,
    targetLabel: title,
  });

  res.json({ review: toReviewResponse(review) });
});

/**
 * deleteReview
 *
 * Removes a reviewer's own review entirely, from both the durable record and the
 * denormalized copy — the pre-validate hook then recomputes overallRating/
 * totalReviews/distribution without it, same as any other edit.
 */
export const deleteReview = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.reviewId)) throw new ApiError(400, 'Invalid review.');

  const review = await Review.findOneAndDelete({ _id: req.params.reviewId, user: req.user._id });
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

  logActivity({
    user: req.user,
    action: 'review.deleted',
    description: `${req.user.name} deleted their review for "${title || 'an item'}".`,
    targetType: 'review',
    targetId: review._id,
    targetLabel: title,
  });

  res.status(204).end();
});
