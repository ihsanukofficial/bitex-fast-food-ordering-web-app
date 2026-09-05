import styles from './CategoryCardTitle.module.css';

/**
 * CategoryCardTitle
 *
 * Renders the category discovery title with its dedicated typography.
 */
function CategoryCardTitle({ children }) {
  return <h3 className={styles.title}>{children}</h3>;
}

export default CategoryCardTitle;
