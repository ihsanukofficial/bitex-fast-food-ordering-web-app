import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteScrollManager
 *
 * Restores the document scroll position after route changes so navigation consistently
 * begins at page start. Skipped when the navigation's own history state carries
 * `preserveScroll: true` — e.g. Menu's category dropdown, which stays on the same page
 * and scrolls the results grid into view itself (see MenuProductsSection's
 * scrollToTop) instead of yanking the whole page back to its very top.
 */
function RouteScrollManager() {
  const { hash, pathname, state } = useLocation();
  const preserveScroll = Boolean(state?.preserveScroll);

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
    if (preserveScroll) return undefined;

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
  }, [hash, pathname, preserveScroll]);

  return null;
}

export default RouteScrollManager;
