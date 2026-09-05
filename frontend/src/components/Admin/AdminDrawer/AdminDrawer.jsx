import { useEffect, useRef } from 'react';
import useFocusTrap from '../../../hooks/useFocusTrap';
import Icon from '../../Utils/Icon/Icon';
import styles from './AdminDrawer.module.css';

/**
 * AdminDrawer
 *
 * A focused right-side panel for admin create/edit forms, so the admin never has to
 * scroll away from the list they're working in. Purely a layout shell — the caller
 * owns all form state and submission logic; `footer` typically holds Cancel/Save
 * buttons wired to the form via its `form` attribute so they stay reachable even
 * while the body scrolls internally.
 */
function AdminDrawer({ isOpen, onClose, title, subtitle, children, footer }) {
  const drawerRef = useRef(null);

  useFocusTrap({
    containerRef: drawerRef,
    isActive: isOpen,
    onEscape: onClose,
    initialFocusSelector: 'input, select, textarea',
  });

  useEffect(() => {
    if (!isOpen) return undefined;
    // Preserve the previous inline value so other overlays don't fight over it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}
        onClick={onClose}
        aria-label="Close panel"
        tabIndex={isOpen ? 0 : -1}
      />
      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!isOpen}
        inert={!isOpen ? '' : undefined}
        tabIndex="-1"
      >
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <Icon name="ri-close-line" size="1.3rem" ariaLabel="" />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </aside>
    </>
  );
}

export default AdminDrawer;
