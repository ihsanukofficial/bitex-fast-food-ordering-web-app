import styles from './ProductDetailGalleryPanel.module.css';

/**
 * ProductDetailGalleryPanel
 *
 * Provides a styled panel boundary within the product-detail experience.
 */
function ProductDetailGalleryPanel({ children }) {
  return <section className={styles.panel}>{children}</section>;
}

export default ProductDetailGalleryPanel;
