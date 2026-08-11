import Icon from '../../Utils/Icon/Icon';
import styles from './OrderConfirmationIcon.module.css';

/**
 * OrderConfirmationIcon
 *
 * Renders the icon treatment used by the delivery and checkout experience.
 */
function OrderConfirmationIcon() {
  return (
    <span className={styles.icon} aria-hidden="true">
      <Icon name="ri-checkbox-circle-fill" size="2.6rem" ariaLabel="" />
    </span>
  );
}

export default OrderConfirmationIcon;
