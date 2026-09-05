import styles from './ProductDetailContentPanel.module.css';

/**
 * ProductDetailContentPanel
 *
 * Provides a styled panel boundary within the product-detail experience.
 */
function ProductDetailContentPanel({ children }) {
  return <section className={styles.panel}>{children}</section>;
}

export default ProductDetailContentPanel;
