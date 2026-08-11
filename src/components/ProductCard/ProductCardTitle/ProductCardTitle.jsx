import styles from './ProductCardTitle.module.css';

/**
 * ProductCardTitle
 *
 * Renders the product card title with its dedicated typography.
 */
function ProductCardTitle({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}

export default ProductCardTitle;
