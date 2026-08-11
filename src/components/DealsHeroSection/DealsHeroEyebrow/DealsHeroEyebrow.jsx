import styles from './DealsHeroEyebrow.module.css';

/**
 * DealsHeroEyebrow
 *
 * Renders the compact contextual label that introduces the deals hero content.
 */
function DealsHeroEyebrow({ children }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

export default DealsHeroEyebrow;
