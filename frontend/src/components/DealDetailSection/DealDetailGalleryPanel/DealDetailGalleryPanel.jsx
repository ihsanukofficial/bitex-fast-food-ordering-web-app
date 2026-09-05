import styles from './DealDetailGalleryPanel.module.css';

/**
 * DealDetailGalleryPanel
 *
 * Provides the positioning boundary for the deal image gallery.
 */
function DealDetailGalleryPanel({ children }) {
  return <section className={styles.panel}>{children}</section>;
}

export default DealDetailGalleryPanel;
