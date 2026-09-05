import Icon from '../../Utils/Icon/Icon';
import styles from './DealsHeroNavigationArrow.module.css';

/**
 * DealsHeroNavigationArrow
 *
 * Provides the directional affordance used by the deals hero experience.
 */
function DealsHeroNavigationArrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      <Icon name="ri-arrow-down-line" size="0.95rem" ariaLabel="" />
    </span>
  );
}

export default DealsHeroNavigationArrow;
