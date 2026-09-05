import DeliveryDetailsRequiredNotice from '../DeliveryDetailsRequiredNotice/DeliveryDetailsRequiredNotice';
import DeliveryDetailsSubmitButton from '../DeliveryDetailsSubmitButton/DeliveryDetailsSubmitButton';
import styles from './DeliveryDetailsFormFooter.module.css';

/**
 * DeliveryDetailsFormFooter
 *
 * Groups submission guidance and the primary action for the delivery and checkout
 * form.
 */
function DeliveryDetailsFormFooter({ isSubmitting = false }) {
  return (
    <footer className={styles.footer}>
      <DeliveryDetailsRequiredNotice />
      <DeliveryDetailsSubmitButton isSubmitting={isSubmitting} />
    </footer>
  );
}

export default DeliveryDetailsFormFooter;
