import Icon from '../../Utils/Icon/Icon';
import styles from './DealCardItemMarker.module.css';

/**
 * DealCardItemMarker
 *
 * Provides the decorative marker used to scan deal card items.
 */
function DealCardItemMarker() {
  return (
    <span className={styles.marker} aria-hidden="true">
      <Icon name="ri-check-line" size="0.9rem" ariaLabel="" />
    </span>
  );
}

export default DealCardItemMarker;
