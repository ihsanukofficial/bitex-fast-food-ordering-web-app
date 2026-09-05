import styles from './DealDetailGalleryQuantityBadge.module.css';

/**
 * DealDetailGalleryQuantityBadge
 *
 * Pins how many of an included product the deal contains to the top-center of its
 * gallery image. Omitted for the deal's own bundle photo, which has no quantity.
 */
function DealDetailGalleryQuantityBadge({ quantity, variant = 'main' }) {
  if (!quantity) return null;

  return (
    <span className={`${styles.badge} ${styles[variant]}`} aria-hidden="true">
      ×{quantity}
    </span>
  );
}

export default DealDetailGalleryQuantityBadge;
