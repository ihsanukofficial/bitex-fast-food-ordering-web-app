import styles from './DealDetailContentPanel.module.css';

/**
 * DealDetailContentPanel
 *
 * Stacks the deal's informational and purchase controls with consistent spacing.
 */
function DealDetailContentPanel({ children }) {
  return <section className={styles.panel}>{children}</section>;
}

export default DealDetailContentPanel;
