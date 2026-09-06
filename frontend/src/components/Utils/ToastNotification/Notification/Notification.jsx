import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useToastNotificationAnimation from '../../../../hooks/useToastNotificationAnimation';
import Icon from '../../Icon/Icon';
import styles from './Notification.module.css';

/**
 * Notification
 *
 * Presents cart feedback and reflects its exit lifecycle without owning notification
 * timing. An order-delivered toast additionally carries `reviewOrderId`, which renders
 * a one-click "Leave a Review" shortcut straight to that order's detail page — the
 * same review prompt still lives in the notification bell (see
 * NavbarNotificationButton) for whenever this toast has already dismissed itself.
 */
function Notification({
  message,
  status = 'added',
  isExiting = false,
  reviewOrderId,
  onDismiss,
}) {
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const quantityIncreased = status === 'quantity-increased';
  const isError = status === 'error';

  useToastNotificationAnimation(notificationRef, isExiting);

  const handleReviewClick = () => {
    navigate(`/profile/orders/${reviewOrderId}`);
    onDismiss();
  };

  return (
    <div
      ref={notificationRef}
      className={`${styles.notification} ${
        quantityIncreased ? styles.quantityIncreased : ''
      } ${isError ? styles.error : ''} ${
        isExiting ? styles.exiting : ''
      }`.trim()}
      role={isError ? 'alert' : 'status'}
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon
          name={
            isError
              ? 'ri-alert-line'
              : quantityIncreased
                ? 'ri-add-circle-fill'
                : 'ri-checkbox-circle-fill'
          }
          size="1.35rem"
          ariaLabel=""
        />
      </span>

      <span className={styles.content}>
        <p className={styles.message}>{message}</p>
        {reviewOrderId && (
          <button
            type="button"
            className={styles.reviewButton}
            onClick={handleReviewClick}
            disabled={isExiting}
          >
            Leave a Review
          </button>
        )}
      </span>

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
