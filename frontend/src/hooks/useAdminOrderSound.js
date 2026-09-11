import { useEffect, useRef } from 'react';
import notificationSfx from '../assets/sounds/notification.mp3';
import { useNotifications } from '../context/NotificationContext';

/**
 * useAdminOrderSound
 *
 * Plays a short chime the instant a new order lands, so staff notice it even when
 * they're not looking at the Orders tab. Reuses the same authenticated socket
 * connection as useAdminActivityBadges (admins auto-join the "admins" room on
 * connect — see backend/src/realtime/socket.js) rather than opening a second one.
 */
function useAdminOrderSound() {
  const { socket } = useNotifications();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!socket) return undefined;

    const handleOrderCreated = () => {
      if (!audioRef.current) audioRef.current = new Audio(notificationSfx);
      // Replay from the start even if the previous chime is still finishing —
      // orders can land back-to-back during a rush.
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Browsers block autoplay until the admin has interacted with the page at
        // least once — non-critical, the badge/toast still land either way.
      });
    };

    socket.on('order:created', handleOrderCreated);
    return () => socket.off('order:created', handleOrderCreated);
  }, [socket]);
}

export default useAdminOrderSound;
