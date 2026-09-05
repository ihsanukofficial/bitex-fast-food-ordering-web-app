import styles from './DealsHeroNavigationText.module.css';

/**
 * DealsHeroNavigationText
 *
 * Provides the styled text primitive used by the deals hero composition.
 */
function DealsHeroNavigationText({ children }) {
  return <span className={styles.text}>{children}</span>;
}

export default DealsHeroNavigationText;
