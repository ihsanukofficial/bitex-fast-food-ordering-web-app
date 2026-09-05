import styles from './DealsCatalogGroupEyebrow.module.css';

/**
 * DealsCatalogGroupEyebrow
 *
 * Renders the compact contextual label that introduces the deals catalog content.
 */
function DealsCatalogGroupEyebrow({ children }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

export default DealsCatalogGroupEyebrow;
