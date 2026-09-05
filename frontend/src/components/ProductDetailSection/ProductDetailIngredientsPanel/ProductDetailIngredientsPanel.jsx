import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './ProductDetailIngredientsPanel.module.css';

/**
 * ProductDetailIngredientsPanel
 *
 * Provides a styled panel boundary within the product-detail experience.
 */
function ProductDetailIngredientsPanel({ children, panelId, isOpen }) {
  const panelRef = useRef(null);
  const animationRef = useRef(null);
  const hasInitialized = useRef(false);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;

    animationRef.current?.kill();

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!hasInitialized.current || reduceMotion) {
      gsap.set(panel, {
        autoAlpha: isOpen ? 1 : 0,
        height: isOpen ? 'auto' : 0,
      });
      hasInitialized.current = true;
      return undefined;
    }

    const timeline = gsap.timeline();
    timeline
      .to(
        panel,
        {
          height: isOpen ? 'auto' : 0,
          duration: 0.32,
          ease: 'power2.inOut',
        },
        0,
      )
      .to(
        panel,
        {
          autoAlpha: isOpen ? 1 : 0,
          duration: 0.22,
          ease: isOpen ? 'power1.out' : 'power1.in',
        },
        isOpen ? 0.04 : 0,
      );

    animationRef.current = timeline;

    return () => timeline.kill();
  }, [isOpen]);

  useLayoutEffect(
    () => () => {
      animationRef.current?.kill();

      if (panelRef.current) {
        gsap.set(panelRef.current, {
          clearProps: 'height,opacity,visibility',
        });
      }
    },
    [],
  );

  return (
    <div
      ref={panelRef}
      id={panelId}
      className={styles.panel}
      aria-hidden={!isOpen}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export default ProductDetailIngredientsPanel;
