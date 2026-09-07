import styles from './MenuSearchInputRow.module.css';

/**
 * MenuSearchInputRow
 *
 * Keeps the search field and submit button on one row even when the form as a whole
 * stacks into a column on phones (see MenuSearchForm) — pairing them, rather than
 * stacking all three controls (category, field, button) into three separate
 * full-width rows, is what keeps the mobile search bar from towering over the page.
 */
function MenuSearchInputRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}

export default MenuSearchInputRow;
