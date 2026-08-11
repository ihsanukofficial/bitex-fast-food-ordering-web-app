import Icon from '../../Utils/Icon/Icon';
import styles from './DeliveryDetailsSubmitButton.module.css';

/**
 * DeliveryDetailsSubmitButton
 *
 * Submits validated delivery details to complete the order.
 */
function DeliveryDetailsSubmitButton() {
  return (
    <button className={styles.button} type="submit">
      Confirm Details
      <Icon name="ri-check-line" size="1.2rem" ariaLabel="" />
    </button>
  );
}

export default DeliveryDetailsSubmitButton;
