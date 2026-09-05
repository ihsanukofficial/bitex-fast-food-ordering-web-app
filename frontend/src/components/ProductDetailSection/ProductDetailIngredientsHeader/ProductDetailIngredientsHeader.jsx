import styles from './ProductDetailIngredientsHeader.module.css';

/**
 * ProductDetailIngredientsHeader
 *
 * Groups the heading and supporting context for the product-detail experience.
 */
function ProductDetailIngredientsHeader({ children }) {
  return <h2 className={styles.heading}>{children}</h2>;
}

export default ProductDetailIngredientsHeader;
