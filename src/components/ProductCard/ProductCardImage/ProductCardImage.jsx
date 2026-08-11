import styles from './ProductCardImage.module.css';

/**
 * ProductCardImage
 *
 * Renders the catalog product image within the card's constrained media region.
 */
function ProductCardImage({ src, alt }) {
  return (
    <img
      className={styles.image}
      src={src}
      alt={alt}
      width="2048"
      height="2048"
      loading="lazy"
      decoding="async"
    />
  );
}

export default ProductCardImage;
