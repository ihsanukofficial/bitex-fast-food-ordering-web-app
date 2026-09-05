import styles from './CategoriesBackground.module.css';

/**
 * CategoriesBackground
 *
 * Isolates the decorative backdrop used by the category discovery experience from its
 * semantic content.
 */
function CategoriesBackground({ children }) {
  return (
    <section
      className={styles.background}
      aria-labelledby="categories-heading"
    >
      {children}
    </section>
  );
}

export default CategoriesBackground;
