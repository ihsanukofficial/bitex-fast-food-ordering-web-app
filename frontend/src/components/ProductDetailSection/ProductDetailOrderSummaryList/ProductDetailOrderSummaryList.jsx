import styles from './ProductDetailOrderSummaryList.module.css';

/**
 * ProductDetailOrderSummaryList
 *
 * Provides semantic list structure and shared spacing for product-detail items.
 */
function ProductDetailOrderSummaryList({ children }) {
  return <dl className={styles.list}>{children}</dl>;
}

export default ProductDetailOrderSummaryList;
