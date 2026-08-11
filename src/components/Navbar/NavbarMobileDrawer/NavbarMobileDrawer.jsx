import styles from './NavbarMobileDrawer.module.css';

/**
 * NavbarMobileDrawer
 *
 * Provides the accessible mobile navigation dialog while leaving focus trapping and
 * open-state ownership to the navbar.
 */
function NavbarMobileDrawer({ drawerRef, isOpen, children }) {
  return (
    <aside
      ref={drawerRef}
      id="navbar-sidebar"
      className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-label="Main navigation"
      inert={!isOpen ? '' : undefined}
      tabIndex="-1"
    >
      {children}
    </aside>
  );
}

export default NavbarMobileDrawer;
