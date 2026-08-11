import styles from './CartDrawerBackdrop.module.css';

/**
 * CartDrawerBackdrop
 *
 * Provides the dismissible visual layer behind the cart overlay while reflecting its
 * open state.
 */
function CartDrawerBackdrop({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}
      onClick={onClick}
      aria-label="Close shopping cart"
      tabIndex={isOpen ? 0 : -1}
    />
  );
}

export default CartDrawerBackdrop;
