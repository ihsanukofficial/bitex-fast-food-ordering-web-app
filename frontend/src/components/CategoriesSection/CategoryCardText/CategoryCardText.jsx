import styles from './CategoryCardText.module.css';

/**
 * CategoryCardText
 *
 * Provides the styled text primitive used by the category discovery composition.
 */
function CategoryCardText({ children }) {
  return <div className={styles.text}>{children}</div>;
}

export default CategoryCardText;
