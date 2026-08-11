import styles from './DealsHeroDescription.module.css';

/**
 * DealsHeroDescription
 *
 * Renders supporting copy for the deals hero experience with consistent typography.
 */
function DealsHeroDescription({ children }) {
  return <p className={styles.description}>{children}</p>;
}

export default DealsHeroDescription;
