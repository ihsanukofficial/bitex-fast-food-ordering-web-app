import { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';

/**
 * Subscribes to live "new signup" broadcasts over the shared notification socket and
 * invokes the given callback with the event payload ({ userId, name } — see
 * authController.js) whenever one arrives — see useAdminOrderEvents for the same
 * pattern applied to orders. The callback is read through a ref so passing a fresh
 * function each render doesn't tear down and resubscribe the socket.
 */
function useAdminUserEvents(onUserRegistered) {
  const { socket } = useNotifications();
  const handlerRef = useRef(onUserRegistered);
  handlerRef.current = onUserRegistered;

  useEffect(() => {
    if (!socket) return undefined;

    const handleEvent = (payload) => handlerRef.current(payload);
    socket.on('user:registered', handleEvent);

    return () => socket.off('user:registered', handleEvent);
  }, [socket]);
}

export default useAdminUserEvents;
