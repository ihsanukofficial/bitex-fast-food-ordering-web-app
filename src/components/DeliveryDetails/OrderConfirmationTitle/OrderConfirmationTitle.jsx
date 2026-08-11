import styles from './OrderConfirmationTitle.module.css';

/**
 * OrderConfirmationTitle
 *
 * Renders the delivery and checkout title with its dedicated typography.
 */
function OrderConfirmationTitle() {
  return <h3 className={styles.title}>Checkout details confirmed</h3>;
}

export default OrderConfirmationTitle;
