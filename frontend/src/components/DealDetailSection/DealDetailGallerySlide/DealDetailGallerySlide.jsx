import styles from './DealDetailGallerySlide.module.css';

/**
 * DealDetailGallerySlide
 *
 * One full-width slot within the gallery track.
 */
function DealDetailGallerySlide({ children }) {
  return <div className={styles.slide}>{children}</div>;
}

export default DealDetailGallerySlide;
