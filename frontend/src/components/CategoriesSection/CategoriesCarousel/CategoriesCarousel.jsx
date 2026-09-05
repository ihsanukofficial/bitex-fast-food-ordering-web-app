import { useCallback, useEffect, useRef, useState } from 'react';
import CategoriesCarouselArrow from '../CategoriesCarouselArrow/CategoriesCarouselArrow';
import CategoriesCarouselFrame from '../CategoriesCarouselFrame/CategoriesCarouselFrame';
import CategoriesViewport from '../CategoriesViewport/CategoriesViewport';
import CategoryNavigationCard from '../CategoryNavigationCard/CategoryNavigationCard';

const EDGE_TOLERANCE = 3;

/**
 * CategoriesCarousel
 *
 * Keeps carousel navigation, scroll availability, and responsive resize measurements
 * synchronized with the rendered track.
 */
function CategoriesCarousel({ categories }) {
  const viewportRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    canScrollPrevious: false,
    canScrollNext: false,
  });

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maximumScroll = viewport.scrollWidth - viewport.clientWidth;
    // A small tolerance absorbs subpixel rounding at either scroll boundary.
    const nextState = {
      canScrollPrevious: viewport.scrollLeft > EDGE_TOLERANCE,
      canScrollNext:
        maximumScroll > EDGE_TOLERANCE &&
        viewport.scrollLeft < maximumScroll - EDGE_TOLERANCE,
    };

    // Preserve object identity when availability is unchanged to avoid redundant renders.
    setScrollState((currentState) =>
      currentState.canScrollPrevious === nextState.canScrollPrevious &&
      currentState.canScrollNext === nextState.canScrollNext
        ? currentState
        : nextState,
    );
  }, []);

  const scheduleScrollStateUpdate = useCallback(() => {
    // Coalesce high-frequency scroll and resize signals into one measurement per frame.
    if (scrollFrameRef.current !== null) return;

    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      updateScrollState();
    });
  }, [updateScrollState]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const resizeObserver = new ResizeObserver(scheduleScrollStateUpdate);
    resizeObserver.observe(viewport);
    viewport.addEventListener('scroll', scheduleScrollStateUpdate, {
      passive: true,
    });
    scheduleScrollStateUpdate();

    return () => {
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', scheduleScrollStateUpdate);
    };
  }, [categories.length, scheduleScrollStateUpdate]);

  const scrollCategories = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = viewport.querySelectorAll('[data-category-card]');
    // Card offsets include the layout gap, producing one-card paging at every breakpoint.
    const scrollDistance =
      cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : viewport.clientWidth;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    viewport.scrollBy({
      left: direction * scrollDistance,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <CategoriesCarouselFrame>
      {scrollState.canScrollPrevious && (
        <CategoriesCarouselArrow
          direction="previous"
          onClick={() => scrollCategories(-1)}
        />
      )}

      <CategoriesViewport ref={viewportRef}>
        {categories.map((category) => (
          <CategoryNavigationCard key={category.id} category={category} />
        ))}
      </CategoriesViewport>

      {scrollState.canScrollNext && (
        <CategoriesCarouselArrow
          direction="next"
          onClick={() => scrollCategories(1)}
        />
      )}
    </CategoriesCarouselFrame>
  );
}

export default CategoriesCarousel;
