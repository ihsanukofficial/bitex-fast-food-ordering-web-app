import styles from './ProductDetailReviewsList.module.css';

/**
 * ProductDetailReviewsList
 *
 * Provides semantic list structure and shared spacing for product-detail items.
 */
function ProductDetailReviewsList({ children }) {
  return <div className={styles.list}>{children}</div>;
}

export default ProductDetailReviewsList;
