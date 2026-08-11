import styles from './ProductDetailAddonsGrid.module.css';

/**
 * ProductDetailAddonsGrid
 *
 * Applies the responsive grid used to present product-detail options.
 */
function ProductDetailAddonsGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

export default ProductDetailAddonsGrid;
