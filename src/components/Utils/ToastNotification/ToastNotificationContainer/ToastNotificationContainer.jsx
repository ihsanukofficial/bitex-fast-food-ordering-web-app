import { useCallback, useEffect, useRef, useState } from 'react';
import { TOAST_EXIT_DURATION_MS } from '../../../../hooks/useToastNotificationAnimation';
import { CART_ITEM_ADD_RESULT_EVENT } from '../../../../utils/cartStorage';
import Notification from '../Notification/Notification';
import styles from './ToastNotificationContainer.module.css';

const NOTIFICATION_DURATION = 4000;

/**
 * Converts a cart mutation result into concise customer-facing feedback.
 */
function createMessage({
  productName,
  quantity = 1,
  cartQuantity,
  status,
}) {
  const itemName = productName || 'Item';

  if (status === 'limit-reached') {
    return `${itemName} is already at the maximum quantity`;
  }

  if (status === 'quantity-increased') {
    return `${itemName} quantity increased to ${cartQuantity}`;
  }

  return quantity > 1
    ? `${quantity} x ${itemName} added to your cart`
    : `${itemName} added to your cart`;
}

/**
 * ToastNotificationContainer
 *
 * Owns the global cart-notification queue and delays removal long enough for dismiss
 * animations to complete.
 */
function ToastNotificationContainer() {
  const [notifications, setNotifications] = useState([]);
  const nextNotificationId = useRef(0);
  // Timer registries live in refs so scheduling does not trigger queue renders.
  const dismissTimers = useRef(new Map());
  const exitTimers = useRef(new Map());

  const dismissNotification = useCallback((notificationId) => {
    const timer = dismissTimers.current.get(notificationId);
    if (timer) clearTimeout(timer);

    dismissTimers.current.delete(notificationId);
    if (exitTimers.current.has(notificationId)) return;

    // Keep the item mounted during its exit animation, then remove it from the queue.
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isExiting: true }
          : notification,
      ),
    );

    const exitTimer = setTimeout(() => {
      exitTimers.current.delete(notificationId);
      setNotifications((current) =>
        current.filter((notification) => notification.id !== notificationId),
      );
    }, TOAST_EXIT_DURATION_MS);

    exitTimers.current.set(notificationId, exitTimer);
  }, []);

  useEffect(() => {
    const timers = dismissTimers.current;
    const pendingExitTimers = exitTimers.current;

    const handleCartItemAddResult = (event) => {
      const id = nextNotificationId.current;
      const detail = event.detail || {};
      nextNotificationId.current += 1;

      // Bound the visible stack to four messages so notifications never cover the UI.
      setNotifications((current) => [
        ...current.slice(-3),
        {
          id,
          message: createMessage(detail),
          status: detail.status,
        },
      ]);

      const timer = setTimeout(
        () => dismissNotification(id),
        NOTIFICATION_DURATION,
      );
      timers.set(id, timer);
    };

    window.addEventListener(
      CART_ITEM_ADD_RESULT_EVENT,
      handleCartItemAddResult,
    );

    return () => {
      window.removeEventListener(
        CART_ITEM_ADD_RESULT_EVENT,
        handleCartItemAddResult,
      );
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
      pendingExitTimers.forEach((timer) => clearTimeout(timer));
      pendingExitTimers.clear();
    };
  }, [dismissNotification]);

  return (
    <div
      className={styles.container}
      aria-live="polite"
      aria-label="Cart notifications"
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          status={notification.status}
          isExiting={notification.isExiting}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </div>
  );
}

export default ToastNotificationContainer;
