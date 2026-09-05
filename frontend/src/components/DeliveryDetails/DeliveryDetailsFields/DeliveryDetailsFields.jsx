import styles from './DeliveryDetailsFields.module.css';

/**
 * DeliveryDetailsFields
 *
 * Groups related form controls within the delivery and checkout flow.
 */
function DeliveryDetailsFields({ children }) {
  return <div className={styles.fields}>{children}</div>;
}

export default DeliveryDetailsFields;
