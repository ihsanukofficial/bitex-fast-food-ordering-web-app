import styles from './DealsHeroHeadingAccent.module.css';

/**
 * DealsHeroHeadingAccent
 *
 * Highlights the emphasized phrase within the deals hero heading without changing its
 * semantics.
 */
function DealsHeroHeadingAccent({ children }) {
  return <span className={styles.accent}>{children}</span>;
}

export default DealsHeroHeadingAccent;
