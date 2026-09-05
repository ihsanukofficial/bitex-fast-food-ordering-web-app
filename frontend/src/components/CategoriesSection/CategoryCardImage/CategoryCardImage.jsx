import styles from './CategoryCardImage.module.css';

/**
 * CategoryCardImage
 *
 * Renders the category discovery visual with feature-specific sizing and loading
 * behavior.
 */
function CategoryCardImage({ src }) {
  return (
    <img
      className={styles.image}
      src={src}
      alt=""
      width="2048"
      height="2048"
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}

export default CategoryCardImage;
