import styles from './BiteXStoryLayout.module.css';

/**
 * BiteXStoryLayout
 *
 * Defines responsive region placement for the BiteX story experience without owning
 * state.
 */
function BiteXStoryLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

export default BiteXStoryLayout;
