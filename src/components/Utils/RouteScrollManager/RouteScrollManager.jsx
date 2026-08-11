import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteScrollManager
 *
 * Restores the document scroll position after route changes so navigation consistently
 * begins at page start.
 */
function RouteScrollManager() {
  const { hash, pathname } = useLocation();

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
