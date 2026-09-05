import styles from './ProductDetailQuantityControls.module.css';

/**
 * ProductDetailQuantityControls
 *
 * Groups related controls within the product-detail interaction flow.
 */
function ProductDetailQuantityControls({ children }) {
  return <div className={styles.controls}>{children}</div>;
}

export default ProductDetailQuantityControls;
