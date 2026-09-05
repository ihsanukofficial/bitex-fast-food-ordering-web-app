import { useEffect, useRef, useState } from 'react';
import { useNotifications } from '../../../context/NotificationContext';
import Icon from '../../Utils/Icon/Icon';
import NavbarCartBadge from '../NavbarCartBadge/NavbarCartBadge';
import styles from './NavbarNotificationButton.module.css';

const RELATIVE_TIME_UNITS = [
  { unit: 'year', ms: 31536000000 },
  { unit: 'month', ms: 2592000000 },
  { unit: 'day', ms: 86400000 },
  { unit: 'hour', ms: 3600000 },
  { unit: 'minute', ms: 60000 },
];

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const formatRelativeTime = (isoDate) => {
  const elapsedMs = new Date(isoDate).getTime() - Date.now();
  const unit = RELATIVE_TIME_UNITS.find(({ ms }) => Math.abs(elapsedMs) >= ms);
  if (!unit) return 'Just now';

  return relativeTimeFormatter.format(Math.round(elapsedMs / unit.ms), unit.unit);
};

/**
 * NavbarNotificationButton
 *
 * Real-time order-update bell: badge shows the unread count kept live by
 * NotificationContext's socket connection, and the dropdown lists full history from
 * oldest interaction to newest, marking a notification read as soon as it's opened.
 */
function NavbarNotificationButton() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleNotificationClick = (notification) => {
    if (!notification.read) markAsRead(notification._id);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.button}
        aria-label="Notifications"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Icon name="ri-notification-3-line" size="1.4rem" ariaLabel="" />
        <NavbarCartBadge
          itemCount={unreadCount}
          label={(count) => `${count} unread notifications`}
        />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu" aria-label="Notifications">
          <div className={styles.menuHeader}>
            <p className={styles.menuTitle}>Notifications</p>
            {unreadCount > 0 && (
              <button type="button" className={styles.markAllButton} onClick={markAllAsRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className={styles.list}>
            {notifications.length === 0 ? (
              <p className={styles.empty}>You have no notifications yet.</p>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification._id}
                  type="button"
                  role="menuitem"
                  className={`${styles.item} ${notification.read ? '' : styles.unread}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <span className={styles.itemDot} aria-hidden="true" />
                  <span className={styles.itemBody}>
                    <span className={styles.itemTitle}>{notification.title}</span>
                    <span className={styles.itemMessage}>{notification.message}</span>
                    <span className={styles.itemTime}>{formatRelativeTime(notification.createdAt)}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarNotificationButton;
