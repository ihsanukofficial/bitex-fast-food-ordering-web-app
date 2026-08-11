import styles from './DeliveryDetailsOptionalIndicator.module.css';

/**
 * DeliveryDetailsOptionalIndicator
 *
 * Provides compact field-state guidance within the delivery and checkout flow.
 */
function DeliveryDetailsOptionalIndicator() {
  return <span className={styles.indicator}>(optional)</span>;
}

export default DeliveryDetailsOptionalIndicator;
