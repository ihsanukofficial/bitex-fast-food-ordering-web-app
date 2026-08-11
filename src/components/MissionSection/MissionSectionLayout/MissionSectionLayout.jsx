import styles from './MissionSectionLayout.module.css';

/**
 * MissionSectionLayout
 *
 * Defines responsive region placement for the brand mission experience without owning
 * state.
 */
function MissionSectionLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

export default MissionSectionLayout;
