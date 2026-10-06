import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient';

const isSupported =
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  'Notification' in window;

const urlBase64ToUint8Array = (base64) => {
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const raw = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
};

/**
 * useAdminPushNotifications
 *
 * Lets an admin opt in to browser (Web Push) notifications for new orders, which are
 * delivered by the service worker even when the site is closed. Browsers only allow
 * the permission prompt from a user gesture, so subscribing is exposed as `enable`
 * for a button; if permission was already granted the subscription is refreshed
 * silently on mount.
 */
function useAdminPushNotifications() {
  const [permission, setPermission] = useState(isSupported ? Notification.permission : 'unsupported');

  const subscribe = useCallback(async () => {
    const { publicKey } = await apiClient.get('/push/public-key');
    if (!publicKey) throw new Error('Push notifications are not configured on the server (missing VAPID keys).');

    const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;

    const subscription =
      (await registration.pushManager.getSubscription()) ||
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      }));

    await apiClient.post('/push/subscribe', subscription.toJSON());
    return true;
  }, []);

  useEffect(() => {
    if (permission !== 'granted') return;
    subscribe().catch((error) => console.warn('Push subscription failed:', error));
  }, [permission, subscribe]);

  const enable = useCallback(async () => {
    if (!isSupported) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result !== 'granted') return;
    try {
      await subscribe();
      await apiClient.post('/push/test');
    } catch (error) {
      console.warn('Push subscription failed:', error);
      window.alert(`Could not turn on order alerts: ${error.message}`);
    }
  }, [subscribe]);

  return { permission, enable };
}

export default useAdminPushNotifications;
