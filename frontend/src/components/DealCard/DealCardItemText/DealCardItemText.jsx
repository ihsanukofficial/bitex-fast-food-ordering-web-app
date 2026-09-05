import styles from './DealCardItemText.module.css';

/**
 * DealCardItemText
 *
 * Provides the styled text primitive used by the deal card composition.
 */
function DealCardItemText({ children }) {
  return <span className={styles.text}>{children}</span>;
}

export default DealCardItemText;
