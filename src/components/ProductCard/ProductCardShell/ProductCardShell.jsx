import styles from './ProductCardShell.module.css';

/**
 * ProductCardShell
 *
 * Provides the outer styling boundary for the product card composition.
 */
function ProductCardShell({ children }) {
  return <article className={styles.card}>{children}</article>;
}

export default ProductCardShell;
