import styles from './ProductCardInfoLabel.module.css';

/**
 * ProductCardInfoLabel
 *
 * Renders the semantic label used by the product card presentation.
 */
function ProductCardInfoLabel({ children }) {
  return <dt className={styles.label}>{children}</dt>;
}

export default ProductCardInfoLabel;
