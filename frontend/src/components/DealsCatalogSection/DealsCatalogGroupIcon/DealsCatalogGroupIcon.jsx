import Icon from '../../Utils/Icon/Icon';
import styles from './DealsCatalogGroupIcon.module.css';

/**
 * DealsCatalogGroupIcon
 *
 * Renders the icon treatment used by the deals catalog experience.
 */
function DealsCatalogGroupIcon({ icon }) {
  return (
    <span className={styles.icon} aria-hidden="true">
      <Icon name={icon} size="1.35rem" ariaLabel="" />
    </span>
  );
}

export default DealsCatalogGroupIcon;
