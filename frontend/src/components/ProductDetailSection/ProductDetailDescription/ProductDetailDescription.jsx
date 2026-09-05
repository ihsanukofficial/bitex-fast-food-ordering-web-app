import styles from './ProductDetailDescription.module.css';

/**
 * ProductDetailDescription
 *
 * Renders the product narrative with consistent detail-page typography.
 */
function ProductDetailDescription({ children }) {
  return <p className={styles.description}>{children}</p>;
}

export default ProductDetailDescription;
