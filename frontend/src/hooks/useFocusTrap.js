import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Returns interactive descendants that can currently receive keyboard focus.
 * Hidden and inert nodes are excluded because selector matching alone does not
 * reflect whether an element participates in the active dialog.
 */
const getFocusableElements = (container) =>
  [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (element) =>
      !element.hasAttribute('inert') && element.getClientRects().length > 0,
  );

/**
 * useFocusTrap
 *
 * Keeps keyboard focus inside an active overlay, supports Escape dismissal,
 * and restores focus to the invoking control when the overlay closes.
 *
 * @param {object} options
 * @param {{ current: HTMLElement | null }} options.containerRef Overlay root.
 * @param {boolean} options.isActive Whether focus containment is enabled.
 * @param {Function} [options.onEscape] Optional Escape-key handler.
 * @param {string} [options.initialFocusSelector] Preferred initial target.
 */
function useFocusTrap({
  containerRef,
  isActive,
  onEscape,
  initialFocusSelector,
}) {
  // Read through a ref so a caller passing a fresh onEscape closure every render
  // (e.g. an inline arrow function) doesn't re-trigger the effect below — that effect
  // moves focus into the overlay on setup, so re-running it on every keystroke inside
  // the overlay would keep yanking focus back to the first field.
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  });

  useEffect(() => {
    if (!isActive || !containerRef.current) return undefined;

    const container = containerRef.current;
    // Returning focus preserves keyboard position after a modal interaction.
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // Wait for the overlay's open styles to commit before moving focus into it.
    const focusFrame = window.requestAnimationFrame(() => {
      const initialTarget =
        (initialFocusSelector &&
          container.querySelector(initialFocusSelector)) ||
        getFocusableElements(container)[0] ||
        container;

      initialTarget.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(container);

      if (focusableElements.length === 0) {
        // The dialog itself is the safe fallback when it has no interactive children.
        event.preventDefault();
        container.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !container.contains(document.activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !container.contains(document.activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);

      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [containerRef, initialFocusSelector, isActive]);
}

export default useFocusTrap;
