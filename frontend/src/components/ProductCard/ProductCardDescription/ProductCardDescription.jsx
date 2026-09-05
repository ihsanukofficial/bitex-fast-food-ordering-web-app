import styles from './ProductCardDescription.module.css';

/**
 * ProductCardDescription
 *
 * Renders supporting copy for the product card experience with consistent typography.
 */
function ProductCardDescription({ children }) {
  return <p className={styles.description}>{children}</p>;
}

export default ProductCardDescription;
