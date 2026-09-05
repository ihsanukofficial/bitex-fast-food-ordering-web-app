import styles from './DealsCatalogGroupHeading.module.css';

/**
 * DealsCatalogGroupHeading
 *
 * Renders the semantic heading for the deals catalog experience with feature-specific
 * presentation.
 */
function DealsCatalogGroupHeading({ children }) {
  return <div className={styles.heading}>{children}</div>;
}

export default DealsCatalogGroupHeading;
