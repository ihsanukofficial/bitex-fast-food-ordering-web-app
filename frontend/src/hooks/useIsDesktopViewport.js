import { useEffect, useState } from 'react';

/**
 * useIsDesktopViewport
 *
 * Tracks a `(min-width: …)` media query live, so callers can react to a window
 * resize or an orientation change — not just the width at first mount. Defaults to
 * 1024px, the same desktop cutoff SiteNavbar already uses to decide when the mobile
 * drawer nav takes over.
 */
export function useIsDesktopViewport(minWidth = 1024) {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(min-width: ${minWidth}px)`).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidth}px)`);
    const handleChange = (event) => setIsDesktop(event.matches);

    handleChange(media);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [minWidth]);

  return isDesktop;
}
