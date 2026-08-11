import styles from './FooterContent.module.css';

/**
 * FooterContent
 *
 * Keeps site footer content layout separate from stateful orchestration.
 */
function FooterContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export default FooterContent;
