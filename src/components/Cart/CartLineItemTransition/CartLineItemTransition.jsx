import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CartLineItemTransition.module.css';

/**
 * CartLineItemTransition
 *
 * Keeps removal animation state separate from cart-item markup so data removal can
 * wait for the visual transition.
 */
function CartLineItemTransition({
  cartIndex,
  children,
  isRemoving,
  onRemovalComplete,
}) {
  const transitionRef = useRef(null);

  useLayoutEffect(() => {
    const transition = transitionRef.current;
    if (!transition || !isRemoving) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onRemovalComplete(cartIndex);
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(transition, {
        height: transition.offsetHeight,
        overflow: 'hidden',
      });

      gsap
        .timeline({ onComplete: () => onRemovalComplete(cartIndex) })
        .to(
          transition,
          {
            autoAlpha: 0,
            x: 16,
            scale: 0.985,
            duration: 0.28,
            ease: 'power2.in',
          },
          0,
        )
        .to(
          transition,
          {
            height: 0,
            marginBottom: 0,
            duration: 0.32,
            ease: 'power2.inOut',
          },
          0,
        );
    }, transition);

    return () => context.revert();
  }, [cartIndex, isRemoving, onRemovalComplete]);

  return (
    <div
      ref={transitionRef}
      className={`${styles.collapse} ${isRemoving ? styles.removing : ''}`}
      aria-hidden={isRemoving}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export default CartLineItemTransition;
