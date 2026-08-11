import styles from './ProductDetailTitle.module.css';

/**
 * ProductDetailTitle
 *
 * Renders the product title with its dedicated typography.
 */
function ProductDetailTitle({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}

export default ProductDetailTitle;
