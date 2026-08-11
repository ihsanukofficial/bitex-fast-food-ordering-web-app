import CustomDropdown from '../../Utils/CustomDropdown/CustomDropdown';
import {
  ALL_CATEGORY_ID,
  menuCategoryOptions,
} from '../../../data/categories';
import styles from './MenuCategoryDropdown.module.css';

/**
 * MenuCategoryDropdown
 *
 * Adapts menu category options to the shared controlled dropdown and supplies stable
 * option identity.
 */
function MenuCategoryDropdown({
  categoryOptions = menuCategoryOptions,
  selectedCategoryId = ALL_CATEGORY_ID,
  onChange,
}) {
  return (
    <div className={styles.dropdown}>
      <CustomDropdown
        options={categoryOptions}
        value={selectedCategoryId}
        ariaLabel="Choose a menu category"
        onChange={onChange}
      />
    </div>
  );
}

export default MenuCategoryDropdown;
