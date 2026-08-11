import styles from './ProductDetailQuantityLabel.module.css';

/**
 * ProductDetailQuantityLabel
 *
 * Renders the semantic label used by the product-detail presentation.
 */
function ProductDetailQuantityLabel() {
  return <span className={styles.label}>Quantity</span>;
}

export default ProductDetailQuantityLabel;
