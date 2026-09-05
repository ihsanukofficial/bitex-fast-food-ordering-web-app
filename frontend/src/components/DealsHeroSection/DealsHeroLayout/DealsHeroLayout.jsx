import styles from './DealsHeroLayout.module.css';

/**
 * DealsHeroLayout
 *
 * Defines responsive region placement for the deals hero experience without owning
 * state.
 */
function DealsHeroLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

export default DealsHeroLayout;
