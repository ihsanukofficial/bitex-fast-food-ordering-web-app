import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { apiClient } from '../services/apiClient';
import { ORDER_NOTIFICATION_TOAST_EVENT } from '../utils/notificationConstants';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

const dispatchToast = (detail) => {
  window.dispatchEvent(new CustomEvent(ORDER_NOTIFICATION_TOAST_EVENT, { detail }));
};

/**
 * NotificationProvider
 *
 * Loads notification history from the API, then opens one same-origin, cookie-authenticated
 * Socket.IO connection per signed-in session so order-status updates reach the navbar bell
 * and the toast feed the instant the backend emits them, without polling.
 */
export function NotificationProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiClient.get('/notifications');
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch {
      // Non-critical: the bell simply stays as-is until the next successful refresh.
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    // No host is passed so this connects same-origin — the dev proxy and production
    // routing both already handle /socket.io the same way they handle /api.
    const newSocket = io({ withCredentials: true });
    setSocket(newSocket);

    newSocket.on('notification:new', (notification) => {
      setNotifications((current) => [notification, ...current].slice(0, 50));
      setUnreadCount((current) => current + 1);
      dispatchToast({
        status: notification.type === 'order_cancelled' ? 'error' : 'order-update',
        message: notification.message,
      });
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [isAuthenticated]);

  const markAsRead = useCallback(async (notificationId) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification._id === notificationId ? { ...notification, read: true } : notification,
      ),
    );
    setUnreadCount((current) => Math.max(0, current - 1));
    try {
      await apiClient.patch(`/notifications/${notificationId}/read`);
    } catch {
      // Best-effort — a stale read flag self-corrects on the next refresh().
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
    setUnreadCount(0);
    try {
      await apiClient.patch('/notifications/read-all');
    } catch {
      // Best-effort — see markAsRead.
    }
  }, []);

  const value = useMemo(
    () => ({ notifications, unreadCount, isLoading, markAsRead, markAllAsRead, refresh, socket }),
    [notifications, unreadCount, isLoading, markAsRead, markAllAsRead, refresh, socket],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider.');
  return context;
};
