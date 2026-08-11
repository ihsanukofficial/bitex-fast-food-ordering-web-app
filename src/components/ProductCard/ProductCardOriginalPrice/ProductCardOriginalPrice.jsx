import styles from './ProductCardOriginalPrice.module.css';

/**
 * ProductCardOriginalPrice
 *
 * Formats and presents pricing within the product card experience.
 */
function ProductCardOriginalPrice({ children }) {
  return <span className={styles.price}>{children}</span>;
}

export default ProductCardOriginalPrice;
