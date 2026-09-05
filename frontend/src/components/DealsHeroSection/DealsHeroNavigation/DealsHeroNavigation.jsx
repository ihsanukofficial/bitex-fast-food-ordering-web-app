import styles from './DealsHeroNavigation.module.css';

/**
 * DealsHeroNavigation
 *
 * Provides semantic structure and shared spacing for the Deals Hero Navigation items.
 */
function DealsHeroNavigation({ children }) {
  return (
    <nav className={styles.navigation} aria-label="Deal collections">
      {children}
    </nav>
  );
}

export default DealsHeroNavigation;
