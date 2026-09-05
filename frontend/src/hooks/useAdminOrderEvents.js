import { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';

/**
 * Subscribes to live order broadcasts (new orders, status changes) over the shared
 * notification socket and invokes the given callback whenever one arrives — lets admin
 * views refetch on real activity instead of polling. The callback is read through a ref
 * so passing a fresh function each render doesn't tear down and resubscribe the socket.
 */
function useAdminOrderEvents(onOrderEvent) {
  const { socket } = useNotifications();
  const handlerRef = useRef(onOrderEvent);
  handlerRef.current = onOrderEvent;

  useEffect(() => {
    if (!socket) return undefined;

    const handleEvent = (order) => handlerRef.current(order);
    socket.on('order:created', handleEvent);
    socket.on('order:updated', handleEvent);

    return () => {
      socket.off('order:created', handleEvent);
      socket.off('order:updated', handleEvent);
    };
  }, [socket]);
}

export default useAdminOrderEvents;
