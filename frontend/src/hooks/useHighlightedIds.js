import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DURATION_MS = 4000;

/**
 * Tracks a set of item ids that should render with a "just arrived" flash — an admin
 * list adds an id when something new lands (a live socket event, or a first-load
 * comparison against when the admin last saw that section) and this hook drops it back
 * off the set on its own a few seconds later, so callers never have to manage timers.
 */
function useHighlightedIds(duration = DEFAULT_DURATION_MS) {
  const [highlightedIds, setHighlightedIds] = useState(() => new Set());
  const timersRef = useRef(new Map());

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current.clear();
    },
    [],
  );

  const highlight = useCallback(
    (id) => {
      if (!id) return;

      setHighlightedIds((current) => {
        if (current.has(id)) return current;
        return new Set(current).add(id);
      });

      const existingTimer = timersRef.current.get(id);
      if (existingTimer) clearTimeout(existingTimer);
      timersRef.current.set(
        id,
        setTimeout(() => {
          timersRef.current.delete(id);
          setHighlightedIds((current) => {
            if (!current.has(id)) return current;
            const next = new Set(current);
            next.delete(id);
            return next;
          });
        }, duration),
      );
    },
    [duration],
  );

  const highlightMany = useCallback((ids) => ids.forEach(highlight), [highlight]);

  return { highlightedIds, highlight, highlightMany };
}

export default useHighlightedIds;
