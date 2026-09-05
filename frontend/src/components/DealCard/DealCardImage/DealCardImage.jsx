import styles from './DealCardImage.module.css';

/**
 * DealCardImage
 *
 * Renders deal imagery with lazy loading and asynchronous decoding for dense grids.
 */
function DealCardImage({ src, alt }) {
  return (
    <img
      className={styles.image}
      src={src}
      alt={alt}
      width="2752"
      height="1536"
      loading="lazy"
      decoding="async"
    />
  );
}

export default DealCardImage;
