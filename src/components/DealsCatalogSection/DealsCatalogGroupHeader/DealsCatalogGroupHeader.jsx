import styles from './DealsCatalogGroupHeader.module.css';

/**
 * DealsCatalogGroupHeader
 *
 * Groups the heading and supporting controls for the deals catalog experience.
 */
function DealsCatalogGroupHeader({ children }) {
  return <header className={styles.header}>{children}</header>;
}

export default DealsCatalogGroupHeader;
