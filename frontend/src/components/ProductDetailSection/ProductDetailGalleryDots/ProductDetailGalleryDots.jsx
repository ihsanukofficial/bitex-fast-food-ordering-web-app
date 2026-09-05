import styles from './ProductDetailGalleryDots.module.css';

/**
 * ProductDetailGalleryDots
 *
 * Groups direct-slide navigation controls for the product-detail gallery.
 */
function ProductDetailGalleryDots({ children }) {
  return (
    <div className={styles.dots} aria-label="Choose product image">
      {children}
    </div>
  );
}

export default ProductDetailGalleryDots;
