import styles from './CategoriesSubtitle.module.css';

/**
 * CategoriesSubtitle
 *
 * Provides supporting context beneath the category-discovery heading.
 */
function CategoriesSubtitle({
  children = 'From crispy classics to hearty comfort food, find exactly what sounds good.',
}) {
  return <p className={styles.subtitle}>{children}</p>;
}

export default CategoriesSubtitle;
