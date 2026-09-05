/**
 * Finds one review's denormalized copy on its target (a Product document, or a deal
 * subdocument) by (order, orderItemIndex) — the pairing used to keep that target's
 * ratings.reviews in sync with the Review collection whenever a review is edited or
 * removed, from either the customer-facing or admin controller.
 */
export const findEmbeddedReview = (ratingsTarget, review) =>
  ratingsTarget.ratings.reviews.find(
    (entry) => entry.order.equals(review.order) && entry.orderItemIndex === review.orderItemIndex,
  );
