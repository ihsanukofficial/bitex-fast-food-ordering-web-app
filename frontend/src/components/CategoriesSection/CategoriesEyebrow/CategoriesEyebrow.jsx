import styles from './CategoriesEyebrow.module.css';

/**
 * CategoriesEyebrow
 *
 * Renders the compact contextual label that introduces the category discovery content.
 */
function CategoriesEyebrow({ children = 'Explore the menu' }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

export default CategoriesEyebrow;
