import Icon from '../../Utils/Icon/Icon';
import styles from './DeliveryDetailsCloseButton.module.css';

/**
 * DeliveryDetailsCloseButton
 *
 * Provides the accessible dismissal action for the delivery overlay.
 */
function DeliveryDetailsCloseButton({ onClick }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Close delivery details"
    >
      <Icon name="ri-close-line" size="1.6rem" ariaLabel="" />
    </button>
  );
}

export default DeliveryDetailsCloseButton;
