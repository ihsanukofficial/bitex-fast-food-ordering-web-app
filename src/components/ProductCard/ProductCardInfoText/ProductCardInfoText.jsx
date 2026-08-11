import styles from './ProductCardInfoText.module.css';

/**
 * ProductCardInfoText
 *
 * Provides the styled text primitive used by the product card composition.
 */
function ProductCardInfoText({ children }) {
  return <span className={styles.text}>{children}</span>;
}

export default ProductCardInfoText;
