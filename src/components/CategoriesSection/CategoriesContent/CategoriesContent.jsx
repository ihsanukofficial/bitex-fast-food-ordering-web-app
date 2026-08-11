import styles from './CategoriesContent.module.css';

/**
 * CategoriesContent
 *
 * Keeps category discovery content layout separate from stateful orchestration.
 */
function CategoriesContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export default CategoriesContent;
