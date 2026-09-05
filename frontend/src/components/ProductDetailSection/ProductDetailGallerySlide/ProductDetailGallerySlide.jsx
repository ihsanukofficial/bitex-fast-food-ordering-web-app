import styles from './ProductDetailGallerySlide.module.css';

/**
 * ProductDetailGallerySlide
 *
 * Provides one semantic slide boundary within the product-detail gallery.
 */
function ProductDetailGallerySlide({ children }) {
  return <div className={styles.slide}>{children}</div>;
}

export default ProductDetailGallerySlide;
