import styles from './QualityPromiseLayout.module.css';

/**
 * QualityPromiseLayout
 *
 * Defines responsive region placement for the quality promise experience without
 * owning state.
 */
function QualityPromiseLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

export default QualityPromiseLayout;
