import { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';

/**
 * Subscribes to live "new review" broadcasts over the shared notification socket and
 * invokes the given callback with the event payload ({ reviewId, title } — see
 * reviewController.js) whenever one arrives — see useAdminOrderEvents for the same
 * pattern applied to orders. The callback is read through a ref so passing a fresh
 * function each render doesn't tear down and resubscribe the socket.
 */
function useAdminReviewEvents(onReviewCreated) {
  const { socket } = useNotifications();
  const handlerRef = useRef(onReviewCreated);
  handlerRef.current = onReviewCreated;

  useEffect(() => {
    if (!socket) return undefined;

    const handleEvent = (payload) => handlerRef.current(payload);
    socket.on('review:created', handleEvent);

    return () => socket.off('review:created', handleEvent);
  }, [socket]);
}

export default useAdminReviewEvents;
