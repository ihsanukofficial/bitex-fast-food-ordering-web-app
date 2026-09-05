import styles from './DealDetailTitle.module.css';

/**
 * DealDetailTitle
 *
 * Renders the deal name with its dedicated typography.
 */
function DealDetailTitle({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}

export default DealDetailTitle;
