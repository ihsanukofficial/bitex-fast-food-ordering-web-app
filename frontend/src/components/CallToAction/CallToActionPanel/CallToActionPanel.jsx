import styles from './CallToActionPanel.module.css';

/**
 * CallToActionPanel
 *
 * Provides the styled panel used to separate call-to-action content from its
 * surroundings.
 */
function CallToActionPanel({ children }) {
  return <div className={styles.panel}>{children}</div>;
}

export default CallToActionPanel;
