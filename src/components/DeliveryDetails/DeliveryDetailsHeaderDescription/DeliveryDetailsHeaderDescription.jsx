import styles from './DeliveryDetailsHeaderDescription.module.css';

/**
 * DeliveryDetailsHeaderDescription
 *
 * Renders supporting copy for the delivery and checkout experience with consistent
 * typography.
 */
function DeliveryDetailsHeaderDescription() {
  return (
    <p className={styles.description}>
      Tell us where and how to deliver your food.
    </p>
  );
}

export default DeliveryDetailsHeaderDescription;
