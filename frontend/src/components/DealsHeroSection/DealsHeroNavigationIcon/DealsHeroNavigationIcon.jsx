import Icon from '../../Utils/Icon/Icon';
import styles from './DealsHeroNavigationIcon.module.css';

/**
 * DealsHeroNavigationIcon
 *
 * Renders the icon treatment used by the deals hero experience.
 */
function DealsHeroNavigationIcon({ icon }) {
  return (
    <span className={styles.icon} aria-hidden="true">
      <Icon name={icon} size="1.15rem" ariaLabel="" />
    </span>
  );
}

export default DealsHeroNavigationIcon;
