import styles from './MenuSearchForm.module.css';

/**
 * MenuSearchForm
 *
 * Provides the semantic submission boundary for the menu search controls.
 */
function MenuSearchForm({ children, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default MenuSearchForm;
