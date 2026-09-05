import styles from './ProductDetailGalleryTrack.module.css';

/**
 * ProductDetailGalleryTrack
 *
 * Positions gallery slides according to the controlled active index.
 */
function ProductDetailGalleryTrack({
  children,
  activeIndex,
  dragOffset,
  isDragging,
}) {
  return (
    <div
      className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
      style={{
        transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)`,
      }}
    >
      {children}
    </div>
  );
}

export default ProductDetailGalleryTrack;
