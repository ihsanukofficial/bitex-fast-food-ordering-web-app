import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Icon from '../../Utils/Icon/Icon';
import styles from './CategoriesCarouselArrow.module.css';

/**
 * CategoriesCarouselArrow
 *
 * Provides the directional affordance used by the category discovery experience.
 */
function CategoriesCarouselArrow({ direction, onClick }) {
  const arrowRef = useRef(null);
  const isPrevious = direction === 'previous';

  useLayoutEffect(() => {
    const arrow = arrowRef.current;

    if (
      !arrow ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        arrow,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.18,
          ease: 'power1.out',
          clearProps: 'opacity,visibility',
        },
      );
    }, arrow);

    return () => context.revert();
  }, []);

  return (
    <button
      ref={arrowRef}
      className={`${styles.arrow} ${
        isPrevious ? styles.previous : styles.next
      }`}
      type="button"
      onClick={onClick}
      aria-label={isPrevious ? 'Show previous categories' : 'Show next categories'}
    >
      <Icon
        name={isPrevious ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'}
        size="1.75rem"
        ariaLabel=""
      />
    </button>
  );
}

export default CategoriesCarouselArrow;
