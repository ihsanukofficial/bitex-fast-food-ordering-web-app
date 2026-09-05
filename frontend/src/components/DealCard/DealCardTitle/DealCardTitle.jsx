import styles from './DealCardTitle.module.css';

/**
 * DealCardTitle
 *
 * Renders the deal card title with its dedicated typography.
 */
function DealCardTitle({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}

export default DealCardTitle;
