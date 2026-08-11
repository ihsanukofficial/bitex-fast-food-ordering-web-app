import Logo from '../../Utils/Logo/Logo';
import styles from './NavbarMobileDrawerLogo.module.css';

/**
 * NavbarMobileDrawerLogo
 *
 * Reuses the shared brand destination while notifying the mobile drawer to close after
 * navigation.
 */
function NavbarMobileDrawerLogo({ onNavigate }) {
  return (
    <div className={styles.logo} onClick={onNavigate}>
      <Logo />
    </div>
  );
}

export default NavbarMobileDrawerLogo;
