import ProductCardRatingIcon from '../ProductCardRatingIcon/ProductCardRatingIcon';
import ProductCardRatingScore from '../ProductCardRatingScore/ProductCardRatingScore';
import ProductCardReviewCount from '../ProductCardReviewCount/ProductCardReviewCount';
import styles from './ProductCardRating.module.css';

/**
 * ProductCardRating
 *
 * Combines normalized rating and review-count primitives into one accessible product
 * summary. A product with no reviews yet has no real rating to show — a "0.0 ★" reads
 * as broken, not as "nothing to show yet" — so this shows a plain "No reviews" instead
 * of a star score no one actually gave it.
 */
function ProductCardRating({ rating, reviewCount }) {
  const hasReviews = reviewCount > 0;

  if (!hasReviews) {
    return (
      <div className={styles.rating}>
        <span className={styles.noReviews}>No reviews</span>
      </div>
    );
  }

  return (
    <div
      className={styles.rating}
      aria-label={`Rated ${rating} out of 5 from ${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'}`}
    >
      <ProductCardRatingIcon />
      <ProductCardRatingScore rating={rating} />
      <span className={styles.divider} aria-hidden="true" />
      <ProductCardReviewCount reviewCount={reviewCount} />
    </div>
  );
}

export default ProductCardRating;
