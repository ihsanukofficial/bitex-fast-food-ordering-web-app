import Icon from '../../Utils/Icon/Icon';
import styles from './DeliveryDetailsSubmitButton.module.css';

/**
 * DeliveryDetailsSubmitButton
 *
 * Submits validated delivery details to complete the order.
 */
function DeliveryDetailsSubmitButton({ isSubmitting = false }) {
  return (
    <button className={styles.button} type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Placing order…' : 'Confirm Details'}
      {!isSubmitting && <Icon name="ri-check-line" size="1.2rem" ariaLabel="" />}
    </button>
  );
}

export default DeliveryDetailsSubmitButton;
