import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { apiClient } from '../services/apiClient';

/**
 * The sidebar sections that can carry an unread badge — the three that fill up from
 * *customer* activity rather than the admin's own edits. Products/Categories/Deals/
 * Promo Codes/Site Content only ever change because an admin changed them, so a badge
 * there would just be counting your own work back at you.
 */
export const BADGE_SECTIONS = ['orders', 'reviews', 'users'];

/** Socket broadcasts that mean "one of these sections just grew". */
const SECTION_EVENTS = {
  'order:created': 'orders',
  'review:created': 'reviews',
  'user:registered': 'users',
};

const EMPTY_COUNTS = { orders: 0, reviews: 0, users: 0 };

const storageKey = (userId) => `bitex:admin-seen:${userId}`;

const readSeen = (userId) => {
  try {
    return JSON.parse(localStorage.getItem(storageKey(userId))) || {};
  } catch {
    // A private window, cleared site data, or hand-edited JSON — treat as "nothing
    // seen yet", which the caller then backfills to "now".
    return {};
  }
};

const writeSeen = (userId, seen) => {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(seen));
  } catch {
    // Storage full or blocked — badges just won't persist across reloads.
  }
};

/**
 * useAdminActivityBadges
 *
 * Tracks how many orders/reviews/signups have arrived since this admin last opened
 * each of those sections, for the sidebar's unread badges. "Last seen" timestamps are
 * per-admin and live in localStorage (they're a personal read-state, not shared store
 * data), and the counts themselves come from a single cheap count query — see
 * adminUserController.getActivityCounts.
 *
 * A section with no stored timestamp is backfilled to "now" instead of counting all
 * of history, so a first login (or a fresh browser) opens with clean badges rather
 * than a wall of numbers about things that happened months ago.
 */
function useAdminActivityBadges() {
  const { user } = useAuth();
  const { socket } = useNotifications();
  const userId = user?.id;
  const [counts, setCounts] = useState(EMPTY_COUNTS);
  // Read through a ref inside refresh() so a changing timestamp doesn't rebuild the
  // callback (and re-trigger every effect that depends on it) on each markSeen.
  const seenRef = useRef({});

  useEffect(() => {
    if (!userId) return;
    const stored = readSeen(userId);
    const now = new Date().toISOString();
    const backfilled = Object.fromEntries(
      BADGE_SECTIONS.map((section) => [section, stored[section] || now]),
    );
    seenRef.current = backfilled;
    writeSeen(userId, backfilled);
  }, [userId]);

  const refresh = useCallback(() => {
    if (!userId) return Promise.resolve();

    const query = new URLSearchParams(seenRef.current).toString();
    return apiClient
      .get(`/admin/activity-counts?${query}`)
      .then((data) => setCounts(data.counts))
      .catch(() => {
        // Non-critical: badges keep their previous values until the next refresh.
      });
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Live broadcasts keep the badges honest without polling — a new order, review, or
  // signup bumps the matching section the moment it happens.
  useEffect(() => {
    if (!socket) return undefined;

    const handlers = Object.entries(SECTION_EVENTS).map(([event, section]) => {
      const handler = () => setCounts((current) => ({ ...current, [section]: current[section] + 1 }));
      socket.on(event, handler);
      return [event, handler];
    });

    return () => handlers.forEach(([event, handler]) => socket.off(event, handler));
  }, [socket]);

  /** Called when the admin opens a section — clears its badge from this moment on. */
  const markSeen = useCallback(
    (section) => {
      if (!userId || !BADGE_SECTIONS.includes(section)) return;

      seenRef.current = { ...seenRef.current, [section]: new Date().toISOString() };
      writeSeen(userId, seenRef.current);
      setCounts((current) => (current[section] === 0 ? current : { ...current, [section]: 0 }));
    },
    [userId],
  );

  return { counts, markSeen, refresh };
}

export default useAdminActivityBadges;
