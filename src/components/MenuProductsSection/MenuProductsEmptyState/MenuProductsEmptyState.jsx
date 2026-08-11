import styles from './MenuProductsEmptyState.module.css';

/**
 * MenuProductsEmptyState
 *
 * Provides clear recovery guidance when the menu results collection has no matching
 * items.
 */
function MenuProductsEmptyState() {
  return (
    <p className={styles.message}>
      No products matched your search. Try another category or keyword.
    </p>
  );
}

export default MenuProductsEmptyState;
