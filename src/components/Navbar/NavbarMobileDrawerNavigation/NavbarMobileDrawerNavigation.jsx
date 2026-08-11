import styles from './NavbarMobileDrawerNavigation.module.css';

/**
 * NavbarMobileDrawerNavigation
 *
 * Provides semantic structure and shared spacing for the Navbar Mobile Drawer
 * Navigation items.
 */
function NavbarMobileDrawerNavigation({ children }) {
  return <div className={styles.navigation}>{children}</div>;
}

export default NavbarMobileDrawerNavigation;
