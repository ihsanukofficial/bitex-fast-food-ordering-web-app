import styles from './CartDrawerShell.module.css';

/**
 * CartDrawerShell
 *
 * Provides the accessible cart dialog boundary and reflects open state without owning
 * focus or persistence logic.
 */
function CartDrawerShell({
  children,
  drawerRef,
  isOpen,
  isCovered,
}) {
  return (
    <aside
      id="shopping-cart-drawer"
      ref={drawerRef}
      className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      aria-hidden={!isOpen || isCovered}
      inert={!isOpen || isCovered ? '' : undefined}
      tabIndex="-1"
    >
      {children}
    </aside>
  );
}

export default CartDrawerShell;
