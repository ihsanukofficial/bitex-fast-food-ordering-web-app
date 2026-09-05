import styles from './ProductDetailReviewFeedback.module.css';

/**
 * ProductDetailReviewFeedback
 *
 * Presents the review's supporting feedback prompt with consistent secondary styling.
 */
function ProductDetailReviewFeedback({ children }) {
  return <p className={styles.feedback}>{children}</p>;
}

export default ProductDetailReviewFeedback;
