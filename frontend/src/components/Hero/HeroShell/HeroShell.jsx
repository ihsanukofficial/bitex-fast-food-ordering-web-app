import styles from './HeroShell.module.css';

/**
 * HeroShell
 *
 * Provides the outer styling boundary for the homepage hero composition.
 */
function HeroShell({ children }) {
  return <section className={styles.shell}>{children}</section>;
}

export default HeroShell;
