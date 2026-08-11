import styles from './DealsHeroNavigationTitle.module.css';

/**
 * DealsHeroNavigationTitle
 *
 * Renders the deals hero title with its dedicated typography.
 */
function DealsHeroNavigationTitle({ children }) {
  return <strong className={styles.title}>{children}</strong>;
}

export default DealsHeroNavigationTitle;
