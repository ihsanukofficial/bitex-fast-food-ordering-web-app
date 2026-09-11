import { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';

/**
 * Subscribes to live order broadcasts (new orders, status changes) over the shared
 * notification socket and invokes the given callback whenever one arrives — lets admin
 * views refetch on real activity instead of polling. The callback is read through a ref
 * so passing a fresh function each render doesn't tear down and resubscribe the socket.
 * Called as (order, eventName) so a caller that only cares about brand-new orders (e.g.
 * to flash the new row) can tell that apart from a status update on an existing one.
 */
function useAdminOrderEvents(onOrderEvent) {
  const { socket } = useNotifications();
  const handlerRef = useRef(onOrderEvent);
  handlerRef.current = onOrderEvent;

  useEffect(() => {
    if (!socket) return undefined;

    const handleEvent = (eventName) => (order) => handlerRef.current(order, eventName);
    const handleCreated = handleEvent('order:created');
    const handleUpdated = handleEvent('order:updated');
    socket.on('order:created', handleCreated);
    socket.on('order:updated', handleUpdated);

    return () => {
      socket.off('order:created', handleCreated);
      socket.off('order:updated', handleUpdated);
    };
  }, [socket]);
}

export default useAdminOrderEvents;
