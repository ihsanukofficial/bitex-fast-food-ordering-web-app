import styles from './ProductDetailAddonsHeading.module.css';

/**
 * ProductDetailAddonsHeading
 *
 * Renders the semantic heading for the product-detail experience with feature-specific
 * presentation.
 */
function ProductDetailAddonsHeading({ children }) {
  return <legend className={styles.heading}>{children}</legend>;
}

export default ProductDetailAddonsHeading;
