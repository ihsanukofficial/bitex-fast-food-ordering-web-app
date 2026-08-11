import Icon from '../../Utils/Icon/Icon';
import styles from './ProductDetailOrderSummaryHeader.module.css';

/**
 * ProductDetailOrderSummaryHeader
 *
 * Groups the heading and supporting context for the product-detail experience.
 */
function ProductDetailOrderSummaryHeader() {
  return (
    <div className={styles.header}>
      <Icon name="ri-file-list-3-line" size="1.15rem" ariaLabel="" />
      <h3 id="order-summary-title">Your selection</h3>
    </div>
  );
}

export default ProductDetailOrderSummaryHeader;
