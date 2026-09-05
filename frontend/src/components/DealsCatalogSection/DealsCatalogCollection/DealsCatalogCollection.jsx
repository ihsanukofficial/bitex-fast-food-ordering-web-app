import styles from './DealsCatalogCollection.module.css';

/**
 * DealsCatalogCollection
 *
 * Provides the structural collection boundary for the deals catalog experience.
 */
function DealsCatalogCollection({ children }) {
  return <div className={styles.collection}>{children}</div>;
}

export default DealsCatalogCollection;
