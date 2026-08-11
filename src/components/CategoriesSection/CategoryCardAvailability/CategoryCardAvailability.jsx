import styles from './CategoryCardAvailability.module.css';

/**
 * CategoryCardAvailability
 *
 * Presents catalog-derived availability so category copy stays synchronized with
 * product data.
 */
function CategoryCardAvailability({ itemCount, itemLabel }) {
  return (
    <p className={styles.availability}>
      {itemCount} {itemLabel} available
    </p>
  );
}

export default CategoryCardAvailability;
