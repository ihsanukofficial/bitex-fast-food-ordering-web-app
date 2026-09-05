import styles from './MenuSearchContent.module.css';

/**
 * MenuSearchContent
 *
 * Keeps application content layout separate from stateful orchestration.
 */
function MenuSearchContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export default MenuSearchContent;
