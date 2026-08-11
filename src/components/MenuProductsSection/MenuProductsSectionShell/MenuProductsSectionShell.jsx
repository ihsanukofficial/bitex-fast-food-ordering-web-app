import styles from './MenuProductsSectionShell.module.css';

/**
 * MenuProductsSectionShell
 *
 * Provides the outer styling boundary for the menu results composition.
 */
function MenuProductsSectionShell({ children }) {
  return <section className={styles.section}>{children}</section>;
}

export default MenuProductsSectionShell;
