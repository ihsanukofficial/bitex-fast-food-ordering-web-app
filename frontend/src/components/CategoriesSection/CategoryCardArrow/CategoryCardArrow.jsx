import Icon from '../../Utils/Icon/Icon';
import styles from './CategoryCardArrow.module.css';

/**
 * CategoryCardArrow
 *
 * Provides the directional affordance used by the category discovery experience.
 */
function CategoryCardArrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      <Icon name="ri-arrow-right-line" size="1.1rem" ariaLabel="" />
    </span>
  );
}

export default CategoryCardArrow;
