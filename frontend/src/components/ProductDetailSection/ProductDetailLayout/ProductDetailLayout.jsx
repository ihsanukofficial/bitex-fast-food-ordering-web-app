import styles from './ProductDetailLayout.module.css';

/**
 * ProductDetailLayout
 *
 * Defines responsive region placement for the product-detail experience without owning
 * state.
 */
function ProductDetailLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

export default ProductDetailLayout;
