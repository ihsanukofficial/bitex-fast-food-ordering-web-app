import styles from './CategoriesSubtitle.module.css';

/**
 * CategoriesSubtitle
 *
 * Provides supporting context beneath the category-discovery heading.
 */
function CategoriesSubtitle() {
  return (
    <p className={styles.subtitle}>
      From crispy classics to hearty comfort food, find exactly what sounds
      good.
    </p>
  );
}

export default CategoriesSubtitle;
