import OrderConfirmationIcon from '../OrderConfirmationIcon/OrderConfirmationIcon';
import OrderConfirmationMenuButton from '../OrderConfirmationMenuButton/OrderConfirmationMenuButton';
import OrderConfirmationMessage from '../OrderConfirmationMessage/OrderConfirmationMessage';
import styles from './OrderConfirmation.module.css';

/**
 * OrderConfirmation
 *
 * Replaces the delivery form after successful validation and provides the next
 * navigation action.
 */
function OrderConfirmation({ onContinueToMenu }) {
  return (
    <div className={styles.success} role="status">
      <OrderConfirmationIcon />
      <OrderConfirmationMessage />
      <OrderConfirmationMenuButton onClick={onContinueToMenu} />
    </div>
  );
}

export default OrderConfirmation;
