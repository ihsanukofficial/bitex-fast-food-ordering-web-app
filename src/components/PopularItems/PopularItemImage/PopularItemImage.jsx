import styles from './PopularItemImage.module.css';

/**
 * PopularItemImage
 *
 * Defers curated product imagery until it approaches the viewport.
 */
function PopularItemImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className={styles.image}
      width="2048"
      height="2048"
      loading="lazy"
      decoding="async"
    />
  );
}

export default PopularItemImage;
