import styles from './DealsCatalogGroupCount.module.css';

/**
 * DealsCatalogGroupCount
 *
 * Presents a derived item count within the deals catalog experience.
 */
function DealsCatalogGroupCount({ count }) {
  return (
    <span className={styles.count}>
      {count} {count === 1 ? 'deal' : 'deals'}
    </span>
  );
}

export default DealsCatalogGroupCount;
