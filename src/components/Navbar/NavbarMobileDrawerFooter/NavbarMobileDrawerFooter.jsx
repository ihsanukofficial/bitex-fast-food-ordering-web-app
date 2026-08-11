import styles from './NavbarMobileDrawerFooter.module.css';

/**
 * NavbarMobileDrawerFooter
 *
 * Groups supporting content at the end of the site navigation experience.
 */
function NavbarMobileDrawerFooter({ children }) {
  return <footer className={styles.footer}>{children}</footer>;
}

export default NavbarMobileDrawerFooter;
