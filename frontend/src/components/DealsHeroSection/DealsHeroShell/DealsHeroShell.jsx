import styles from './DealsHeroShell.module.css';

/**
 * DealsHeroShell
 *
 * Provides the outer styling boundary for the deals hero composition.
 */
function DealsHeroShell({ children }) {
  return (
    <section
      className={styles.hero}
      aria-labelledby="deals-page-title"
    >
      {children}
    </section>
  );
}

export default DealsHeroShell;
