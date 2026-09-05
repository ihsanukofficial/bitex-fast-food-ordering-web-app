import styles from './ProductDetailGalleryImage.module.css';

/**
 * ProductDetailGalleryImage
 *
 * Renders a product visual with gallery-specific sizing and alternative text.
 */
function ProductDetailGalleryImage({ src, alt, priority = false }) {
  return (
    <img
      className={styles.image}
      src={src}
      alt={alt}
      width="2048"
      height="2048"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}

export default ProductDetailGalleryImage;
