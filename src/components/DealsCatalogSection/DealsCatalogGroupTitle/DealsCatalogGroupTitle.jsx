import styles from './DealsCatalogGroupTitle.module.css';

/**
 * DealsCatalogGroupTitle
 *
 * Renders the deals catalog title with its dedicated typography.
 */
function DealsCatalogGroupTitle({ children, id }) {
  return (
    <h2 id={id} className={styles.title}>
      {children}
    </h2>
  );
}

export default DealsCatalogGroupTitle;
