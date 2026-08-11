import styles from './DeliveryDetailsHeaderEyebrow.module.css';

/**
 * DeliveryDetailsHeaderEyebrow
 *
 * Renders the compact contextual label that introduces the delivery and checkout
 * content.
 */
function DeliveryDetailsHeaderEyebrow() {
  return <p className={styles.eyebrow}>Complete your order</p>;
}

export default DeliveryDetailsHeaderEyebrow;
