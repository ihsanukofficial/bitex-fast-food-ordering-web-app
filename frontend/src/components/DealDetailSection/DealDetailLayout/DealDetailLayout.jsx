import styles from './DealDetailLayout.module.css';

/**
 * DealDetailLayout
 *
 * Positions the gallery and content panels side by side on wide viewports and stacks
 * them on narrow ones.
 */
function DealDetailLayout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

export default DealDetailLayout;
