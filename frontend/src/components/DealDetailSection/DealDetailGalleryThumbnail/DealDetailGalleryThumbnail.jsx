import DealDetailGalleryQuantityBadge from '../DealDetailGalleryQuantityBadge/DealDetailGalleryQuantityBadge';
import styles from './DealDetailGalleryThumbnail.module.css';

/**
 * DealDetailGalleryThumbnail
 *
 * A selectable gallery thumbnail, badged with its included quantity when it represents
 * one of the deal's products rather than the deal's own bundle photo.
 */
function DealDetailGalleryThumbnail({ src, alt, quantity, isActive, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.thumbnail} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      aria-current={isActive || undefined}
      aria-label={alt}
    >
      <img className={styles.image} src={src} alt="" loading="lazy" decoding="async" />
      <DealDetailGalleryQuantityBadge quantity={quantity} variant="thumbnail" />
    </button>
  );
}

export default DealDetailGalleryThumbnail;
