import styles from './OrderConfirmationDescription.module.css';

/**
 * OrderConfirmationDescription
 *
 * Renders supporting copy for the delivery and checkout experience with consistent
 * typography.
 */
function OrderConfirmationDescription() {
  return (
    <p className={styles.description}>
      Your order has been placed successfully. We’ll prepare it for delivery
      using the details you provided.
    </p>
  );
}

export default OrderConfirmationDescription;
