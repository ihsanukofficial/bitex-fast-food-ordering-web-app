import DeliveryDetailsRequiredMark from '../DeliveryDetailsRequiredMark/DeliveryDetailsRequiredMark';
import styles from './DeliveryDetailsRequiredNotice.module.css';

/**
 * DeliveryDetailsRequiredNotice
 *
 * Communicates supporting requirements within the delivery and checkout flow.
 */
function DeliveryDetailsRequiredNotice() {
  return (
    <p className={styles.notice}>
      Fields marked with <DeliveryDetailsRequiredMark compact /> are required.
    </p>
  );
}

export default DeliveryDetailsRequiredNotice;
