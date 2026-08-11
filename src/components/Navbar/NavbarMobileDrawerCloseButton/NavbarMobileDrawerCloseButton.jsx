import Icon from '../../Utils/Icon/Icon';
import styles from './NavbarMobileDrawerCloseButton.module.css';

/**
 * NavbarMobileDrawerCloseButton
 *
 * Provides the accessible dismissal action for mobile navigation.
 */
function NavbarMobileDrawerCloseButton({ onClick }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Close navigation menu"
    >
      <Icon name="ri-close-line" size="1.5rem" ariaLabel="" />
    </button>
  );
}

export default NavbarMobileDrawerCloseButton;
