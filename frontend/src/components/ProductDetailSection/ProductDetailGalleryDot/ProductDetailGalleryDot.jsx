import styles from './ProductDetailGalleryDot.module.css';

/**
 * ProductDetailGalleryDot
 *
 * Provides direct, accessible navigation to one product-detail gallery slide.
 */
function ProductDetailGalleryDot({
  isActive,
  onClick,
  imageNumber,
  imageCount,
}) {
  return (
    <button
      type="button"
      className={`${styles.dot} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      aria-label={`Show image ${imageNumber} of ${imageCount}`}
      aria-current={isActive ? 'true' : undefined}
    />
  );
}

export default ProductDetailGalleryDot;
