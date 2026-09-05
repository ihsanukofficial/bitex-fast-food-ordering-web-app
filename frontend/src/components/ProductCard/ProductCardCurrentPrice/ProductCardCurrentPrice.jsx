import styles from './ProductCardCurrentPrice.module.css';

/**
 * ProductCardCurrentPrice
 *
 * Formats and presents pricing within the product card experience.
 */
function ProductCardCurrentPrice({ children }) {
  return <span className={styles.price}>{children}</span>;
}

export default ProductCardCurrentPrice;
