import ProductDetailReviewFeedback from '../ProductDetailReviewFeedback/ProductDetailReviewFeedback';
import ProductDetailReviewStars from '../ProductDetailReviewStars/ProductDetailReviewStars';
import styles from './ProductDetailReview.module.css';

/**
 * ProductDetailReview
 *
 * Presents a single review with rating semantics and decorative feedback affordances.
 */
function ProductDetailReview({
  reviewerName = 'Anonymous',
  reviewDate = 'Date unavailable',
  rating,
  feedback,
}) {
  return (
    <article className={styles.review}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.name}>{reviewerName}</h3>
          <time className={styles.date}>{reviewDate}</time>
        </div>
        <ProductDetailReviewStars rating={rating} />
      </div>
      <ProductDetailReviewFeedback>{feedback}</ProductDetailReviewFeedback>
    </article>
  );
}

export default ProductDetailReview;
