import ProductCardRatingIcon from '../ProductCardRatingIcon/ProductCardRatingIcon';
import ProductCardRatingScore from '../ProductCardRatingScore/ProductCardRatingScore';
import ProductCardReviewCount from '../ProductCardReviewCount/ProductCardReviewCount';
import styles from './ProductCardRating.module.css';

/**
 * ProductCardRating
 *
 * Combines normalized rating and review-count primitives into one accessible product
 * summary.
 */
function ProductCardRating({ rating, reviewCount }) {
  return (
    <div
      className={styles.rating}
      aria-label={`Product rating ${rating} out of 5 based on ${reviewCount} reviews`}
    >
      <ProductCardRatingIcon />
      <ProductCardRatingScore rating={rating} />
      <ProductCardReviewCount reviewCount={reviewCount} />
    </div>
  );
}

export default ProductCardRating;
