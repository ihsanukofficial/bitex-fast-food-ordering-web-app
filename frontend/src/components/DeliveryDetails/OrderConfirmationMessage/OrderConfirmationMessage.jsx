import OrderConfirmationDescription from '../OrderConfirmationDescription/OrderConfirmationDescription';
import OrderConfirmationEyebrow from '../OrderConfirmationEyebrow/OrderConfirmationEyebrow';
import OrderConfirmationTitle from '../OrderConfirmationTitle/OrderConfirmationTitle';
import styles from './OrderConfirmationMessage.module.css';

/**
 * OrderConfirmationMessage
 *
 * Presents contextual feedback within the delivery and checkout flow.
 */
function OrderConfirmationMessage() {
  return (
    <div className={styles.message}>
      <OrderConfirmationEyebrow />
      <OrderConfirmationTitle />
      <OrderConfirmationDescription />
    </div>
  );
}

export default OrderConfirmationMessage;
