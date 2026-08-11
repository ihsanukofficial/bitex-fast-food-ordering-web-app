import DeliveryDetailsRequiredMark from '../DeliveryDetailsRequiredMark/DeliveryDetailsRequiredMark';
import styles from './DeliveryDetailsFieldLabel.module.css';

/**
 * DeliveryDetailsFieldLabel
 *
 * Renders the semantic label used by the delivery and checkout presentation.
 */
function DeliveryDetailsFieldLabel({ inputId, label, required = false, children }) {
  return (
    <label className={styles.label} htmlFor={inputId}>
      {label}
      {required && <DeliveryDetailsRequiredMark />}
      {children && <> {children}</>}
    </label>
  );
}

export default DeliveryDetailsFieldLabel;
