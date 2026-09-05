import styles from './MenuSearchInput.module.css';

/**
 * MenuSearchInput
 *
 * Provides the controlled Menu Search Input field with feature-specific presentation.
 */
function MenuSearchInput({ placeholder, value, onChange }) {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label="Search food"
    />
  );
}

export default MenuSearchInput;
