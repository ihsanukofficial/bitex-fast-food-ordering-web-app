import styles from './DealCardShell.module.css';

/**
 * DealCardShell
 *
 * Provides the outer styling boundary for the deal card composition.
 */
function DealCardShell({ children, accent }) {
  return (
    <article
      className={styles.card}
      style={{ '--deal-accent': accent }}
    >
      {children}
    </article>
  );
}

export default DealCardShell;
