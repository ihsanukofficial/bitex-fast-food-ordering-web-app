import MenuSearchInput from '../MenuSearchInput/MenuSearchInput';
import styles from './MenuSearchField.module.css';

/**
 * MenuSearchField
 *
 * Composes the label and input controls for the Menu Search Field field.
 */
function MenuSearchField({
  placeholder = 'Search any food...',
  value,
  onChange,
}) {
  return (
    <label className={styles.field}>
      <MenuSearchInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default MenuSearchField;
