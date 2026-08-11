import styles from './DeliveryDetailsRequiredMark.module.css';

/**
 * DeliveryDetailsRequiredMark
 *
 * Applies a consistent required-field indicator without changing native validation.
 */
function DeliveryDetailsRequiredMark({ compact = false }) {
  return (
    <span
      className={`${styles.mark} ${compact ? styles.compact : ''}`}
      aria-hidden="true"
    >
      *
    </span>
  );
}

export default DeliveryDetailsRequiredMark;
