import styles from './DealsCatalogGroupShell.module.css';

/**
 * DealsCatalogGroupShell
 *
 * Provides the outer styling boundary for the deals catalog composition.
 */
function DealsCatalogGroupShell({
  children,
  id,
  titleId,
  accent,
  tint,
}) {
  return (
    <section
      id={id}
      className={styles.group}
      style={{
        '--section-accent': accent,
        '--section-tint': tint,
      }}
      aria-labelledby={titleId}
    >
      {children}
    </section>
  );
}

export default DealsCatalogGroupShell;
