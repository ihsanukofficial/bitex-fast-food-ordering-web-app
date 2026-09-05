import productReviewStars from '../../../data/productReviewStars';
import Icon from '../../Utils/Icon/Icon';
import styles from './ProductDetailReviewStars.module.css';

/**
 * ProductDetailReviewStars
 *
 * Maps a numeric rating to the shared five-star definition for consistent review
 * presentation.
 */
function ProductDetailReviewStars({ rating }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {productReviewStars.map((star) => (
        <Icon
          key={star}
          name={star <= Math.round(rating) ? 'ri-star-fill' : 'ri-star-line'}
          color={star <= Math.round(rating) ? '#fca810' : '#a3a3a3'}
          size="1rem"
          ariaLabel=""
        />
      ))}
    </div>
  );
}

export default ProductDetailReviewStars;
