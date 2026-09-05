import Icon from '../../Utils/Icon/Icon';
import styles from './NavbarMenuToggle.module.css';

/**
 * NavbarMenuToggle
 *
 * Exposes the Navbar Menu Toggle state change with accessible expanded-state
 * semantics.
 */
function NavbarMenuToggle({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="navbar-sidebar"
    >
      <Icon name={isOpen ? 'ri-close-line' : 'ri-menu-3-line'} size="1.5rem" ariaLabel="" />
    </button>
  );
}

export default NavbarMenuToggle;
