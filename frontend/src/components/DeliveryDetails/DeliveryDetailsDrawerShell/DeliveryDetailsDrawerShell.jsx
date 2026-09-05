import styles from './DeliveryDetailsDrawerShell.module.css';

/**
 * DeliveryDetailsDrawerShell
 *
 * Provides the outer styling boundary for the delivery and checkout composition.
 */
function DeliveryDetailsDrawerShell({ children, drawerRef, isOpen }) {
  return (
    <aside
      ref={drawerRef}
      className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Delivery details"
      aria-hidden={!isOpen}
      inert={!isOpen ? '' : undefined}
      tabIndex="-1"
    >
      {children}
    </aside>
  );
}

export default DeliveryDetailsDrawerShell;
