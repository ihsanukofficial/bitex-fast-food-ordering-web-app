import styles from './DeliveryDetailsField.module.css';

/**
 * DeliveryDetailsField
 *
 * Composes the label and input controls for the Delivery Details Field field.
 */
function DeliveryDetailsField({ children }) {
  return <div className={styles.field}>{children}</div>;
}

export default DeliveryDetailsField;
