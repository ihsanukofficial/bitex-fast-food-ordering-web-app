import styles from './PopularItemsBackground.module.css';

/**
 * PopularItemsBackground
 *
 * Isolates the decorative backdrop used by the popular items experience from its
 * semantic content.
 */
function PopularItemsBackground({ children }) {
  return (
    <section
      className={styles.background}
      aria-labelledby="popular-items-heading"
    >
      {children}
    </section>
  );
}

export default PopularItemsBackground;
