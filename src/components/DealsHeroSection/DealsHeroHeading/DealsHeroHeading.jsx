import styles from './DealsHeroHeading.module.css';

/**
 * DealsHeroHeading
 *
 * Renders the semantic heading for the deals hero experience with feature-specific
 * presentation.
 */
function DealsHeroHeading({ children }) {
  return (
    <h1 id="deals-page-title" className={styles.heading}>
      {children}
    </h1>
  );
}

export default DealsHeroHeading;
