import DeliveryDetailsRequiredNotice from '../DeliveryDetailsRequiredNotice/DeliveryDetailsRequiredNotice';
import DeliveryDetailsSubmitButton from '../DeliveryDetailsSubmitButton/DeliveryDetailsSubmitButton';
import styles from './DeliveryDetailsFormFooter.module.css';

/**
 * DeliveryDetailsFormFooter
 *
 * Groups submission guidance and the primary action for the delivery and checkout
 * form.
 */
function DeliveryDetailsFormFooter() {
  return (
    <footer className={styles.footer}>
      <DeliveryDetailsRequiredNotice />
      <DeliveryDetailsSubmitButton />
    </footer>
  );
}

export default DeliveryDetailsFormFooter;
