import styles from './OrderConfirmationEyebrow.module.css';

/**
 * OrderConfirmationEyebrow
 *
 * Renders the compact contextual label that introduces the delivery and checkout
 * content.
 */
function OrderConfirmationEyebrow() {
  return <p className={styles.eyebrow}>Order confirmed</p>;
}

export default OrderConfirmationEyebrow;
