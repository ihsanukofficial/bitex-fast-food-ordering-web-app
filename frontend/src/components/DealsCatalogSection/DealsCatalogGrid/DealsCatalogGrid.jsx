import styles from './DealsCatalogGrid.module.css';

/**
 * DealsCatalogGrid
 *
 * Applies the responsive grid used to present deals catalog items.
 */
function DealsCatalogGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

export default DealsCatalogGrid;
