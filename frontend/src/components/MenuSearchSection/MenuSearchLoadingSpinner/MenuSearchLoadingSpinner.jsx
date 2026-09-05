import styles from './MenuSearchLoadingSpinner.module.css';

/**
 * MenuSearchLoadingSpinner
 *
 * Communicates transient loading state without adding layout shift to the menu search
 * action.
 */
function MenuSearchLoadingSpinner() {
  return <span className={styles.spinner} aria-hidden="true" />;
}

export default MenuSearchLoadingSpinner;
