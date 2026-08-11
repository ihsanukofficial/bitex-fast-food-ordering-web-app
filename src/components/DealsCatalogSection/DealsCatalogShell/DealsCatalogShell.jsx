import styles from './DealsCatalogShell.module.css';

/**
 * DealsCatalogShell
 *
 * Provides the outer styling boundary for the deals catalog composition.
 */
function DealsCatalogShell({ children }) {
  return (
    <section
      className={styles.catalog}
      aria-label="Signature deal collections"
    >
      {children}
    </section>
  );
}

export default DealsCatalogShell;
