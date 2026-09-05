import styles from './NavbarMobileBackdrop.module.css';

/**
 * NavbarMobileBackdrop
 *
 * Provides the dismissible visual layer behind the site navigation overlay while
 * reflecting its open state.
 */
function NavbarMobileBackdrop({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}
      onClick={onClick}
      aria-label="Close navigation menu"
      tabIndex={isOpen ? 0 : -1}
    />
  );
}

export default NavbarMobileBackdrop;
