import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const PAGE_PARAM = 'page';

/**
 * Client-side pagination over an already-loaded list, with the current page reflected
 * in the URL's `page` query param — reloading, sharing/bookmarking a link, or using
 * the browser's back/forward buttons all land back on the same page instead of always
 * resetting to page 1. `page=1` is never written to the URL; it's the default, so
 * there's nothing there to show.
 *
 * `resetKey` should identify "this is a genuinely different list to page through" (a
 * new search/category filter) — changing it jumps back to page 1. Left undefined (as
 * the Wishlist does), the current page survives ordinary list mutations (removing one
 * wishlisted item, say) and is only clamped down if that exact page number stops
 * existing, rather than always bouncing the customer back to page 1 for a one-item
 * change.
 */
function usePagination(items, pageSize, resetKey) {
  const [searchParams, setSearchParams] = useSearchParams();
  // Compared against on every run, not consumed by the first one — React (Strict
  // Mode, in particular) can invoke an effect twice in a row for the very same
  // render with nothing having actually changed, and a plain "have I run yet"
  // flag would treat that second call as a real change and reset the page anyway.
  // Comparing the actual remembered value survives that regardless of how many
  // times the effect happens to run for it.
  const previousResetKeyRef = useRef(resetKey);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const requestedPage = Math.max(1, Number(searchParams.get(PAGE_PARAM)) || 1);
  const currentPage = Math.min(requestedPage, totalPages);

  const setPageParam = (targetPage, { replace = false } = {}) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (targetPage <= 1) next.delete(PAGE_PARAM);
        else next.set(PAGE_PARAM, String(targetPage));
        return next;
      },
      { replace },
    );
  };

  useEffect(() => {
    if (previousResetKeyRef.current === resetKey) return;
    previousResetKeyRef.current = resetKey;
    setPageParam(1, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  // Corrects the URL itself once totalPages shrinks below the requested page — the
  // `currentPage` clamp above already renders correctly in the meantime, this just
  // stops the stale, too-high number from resurfacing (e.g. on a reload) later.
  // Skipped while `items` is empty: the Wishlist's list can still be `[]` (making
  // totalPages a misleading 1) for a moment while it's still loading, and clamping
  // against that would overwrite a legitimate deep-linked page before the real count
  // ever gets a chance to render — this re-checks itself once real items arrive
  // (items.length is a dependency below), so a *genuinely* empty list simply never
  // has anything worth clamping, and a temporarily-empty one corrects itself as soon
  // as it isn't.
  useEffect(() => {
    if (items.length === 0) return;
    if (requestedPage > totalPages) setPageParam(totalPages, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedPage, totalPages, items.length]);

  const pageItems = useMemo(
    () => items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [items, currentPage, pageSize],
  );

  return { page: currentPage, totalPages, pageItems, goToPage: setPageParam };
}

export default usePagination;
