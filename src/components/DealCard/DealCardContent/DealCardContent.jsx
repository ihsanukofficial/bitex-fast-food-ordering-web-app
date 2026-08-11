import styles from './DealCardContent.module.css';

/**
 * DealCardContent
 *
 * Keeps deal card content layout separate from stateful orchestration.
 */
function DealCardContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export default DealCardContent;
