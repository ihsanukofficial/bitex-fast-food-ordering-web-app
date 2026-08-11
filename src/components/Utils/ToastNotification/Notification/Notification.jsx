import { useRef } from 'react';
import useToastNotificationAnimation from '../../../../hooks/useToastNotificationAnimation';
import Icon from '../../Icon/Icon';
import styles from './Notification.module.css';

/**
 * Notification
 *
 * Presents cart feedback and reflects its exit lifecycle without owning notification
 * timing.
 */
function Notification({
  message,
  status = 'added',
  isExiting = false,
  onDismiss,
}) {
  const notificationRef = useRef(null);
  const quantityIncreased = status === 'quantity-increased';

  useToastNotificationAnimation(notificationRef, isExiting);

  return (
    <div
      ref={notificationRef}
      className={`${styles.notification} ${
        quantityIncreased ? styles.quantityIncreased : ''
      } ${
        isExiting ? styles.exiting : ''
      }`.trim()}
      role="status"
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon
          name={
            quantityIncreased
              ? 'ri-add-circle-fill'
              : 'ri-checkbox-circle-fill'
          }
          size="1.35rem"
          ariaLabel=""
        />
      </span>

      <p className={styles.message}>{message}</p>

      <button
        className={styles.dismissButton}
        type="button"
        onClick={onDismiss}
        disabled={isExiting}
        aria-label="Dismiss notification"
      >
        <Icon name="ri-close-line" size="1.2rem" ariaLabel="" />
      </button>
    </div>
  );
}

export default Notification;
