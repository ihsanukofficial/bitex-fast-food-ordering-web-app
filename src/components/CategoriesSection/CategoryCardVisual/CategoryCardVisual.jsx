import styles from './CategoryCardVisual.module.css';

/**
 * CategoryCardVisual
 *
 * Composes the visual region of the category discovery experience.
 */
function CategoryCardVisual({ children }) {
  return <div className={styles.visual}>{children}</div>;
}

export default CategoryCardVisual;
