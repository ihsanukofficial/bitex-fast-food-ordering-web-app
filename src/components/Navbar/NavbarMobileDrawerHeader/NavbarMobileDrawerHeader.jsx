import styles from './NavbarMobileDrawerHeader.module.css';

/**
 * NavbarMobileDrawerHeader
 *
 * Groups the heading and supporting controls for the site navigation experience.
 */
function NavbarMobileDrawerHeader({ children }) {
  return <header className={styles.header}>{children}</header>;
}

export default NavbarMobileDrawerHeader;
