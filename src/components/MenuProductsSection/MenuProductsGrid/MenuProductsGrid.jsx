import styles from './MenuProductsGrid.module.css';

/**
 * MenuProductsGrid
 *
 * Applies the responsive grid used to present menu results items.
 */
function MenuProductsGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

export default MenuProductsGrid;
