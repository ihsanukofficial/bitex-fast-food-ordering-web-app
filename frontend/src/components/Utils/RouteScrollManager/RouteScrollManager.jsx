import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteScrollManager
 *
 * Restores the document scroll position after route changes so navigation consistently
 * begins at page start.
 */
function RouteScrollManager() {
  const { hash, pathname } = useLocation();

  // The browser's own back/forward scroll restoration races with the reset below —
  // it can reapply an old scroll offset (sometimes past the bottom of a now-shorter
  // page) after this effect already ran. Taking manual control avoids that race.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
    return undefined;
  }, []);

  useLayoutEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));

        if (target) {
          target.scrollIntoView({ block: 'start' });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [hash, pathname]);

  return null;
}

export default RouteScrollManager;
