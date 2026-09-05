import Icon from '../../Utils/Icon/Icon';
import styles from './PopularItemArrow.module.css';

/**
 * PopularItemArrow
 *
 * Provides the directional affordance used by the popular items experience.
 */
function PopularItemArrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      <Icon name="ri-arrow-right-line" size="1rem" ariaLabel="" />
    </span>
  );
}

export default PopularItemArrow;
