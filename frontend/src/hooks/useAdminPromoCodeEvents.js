import { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';

/**
 * Subscribes to live promo-code broadcasts (created, edited, deleted, or a usage
 * count ticking up from a new order) over the shared notification socket — lets
 * AdminPromoCodes refetch on real activity instead of polling. Mirrors
 * useAdminOrderEvents. The callback is read through a ref so passing a fresh function
 * each render doesn't tear down and resubscribe the socket.
 */
function useAdminPromoCodeEvents(onPromoCodeEvent) {
  const { socket } = useNotifications();
  const handlerRef = useRef(onPromoCodeEvent);
  handlerRef.current = onPromoCodeEvent;

  useEffect(() => {
    if (!socket) return undefined;

    const handleEvent = (promoCode) => handlerRef.current(promoCode);
    socket.on('promo-code:created', handleEvent);
    socket.on('promo-code:updated', handleEvent);
    socket.on('promo-code:deleted', handleEvent);

    return () => {
      socket.off('promo-code:created', handleEvent);
      socket.off('promo-code:updated', handleEvent);
      socket.off('promo-code:deleted', handleEvent);
    };
  }, [socket]);
}

export default useAdminPromoCodeEvents;
