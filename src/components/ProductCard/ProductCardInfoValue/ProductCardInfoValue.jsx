import styles from './ProductCardInfoValue.module.css';

/**
 * ProductCardInfoValue
 *
 * Renders a formatted value within the product card presentation.
 */
function ProductCardInfoValue({ children }) {
  return <dd className={styles.value}>{children}</dd>;
}

export default ProductCardInfoValue;
