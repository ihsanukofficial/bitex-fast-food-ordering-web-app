import styles from './DealCardMedia.module.css';

/**
 * DealCardMedia
 *
 * Groups image and overlay content within the deal card media region.
 */
function DealCardMedia({ children }) {
  return <div className={styles.media}>{children}</div>;
}

export default DealCardMedia;
