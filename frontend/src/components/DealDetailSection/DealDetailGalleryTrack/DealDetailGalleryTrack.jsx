import styles from './DealDetailGalleryTrack.module.css';

/**
 * DealDetailGalleryTrack
 *
 * Translates the slide strip to the active slide, plus any live drag offset.
 */
function DealDetailGalleryTrack({ children, activeIndex, dragOffset, isDragging }) {
  return (
    <div
      className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
      style={{ transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)` }}
    >
      {children}
    </div>
  );
}

export default DealDetailGalleryTrack;
