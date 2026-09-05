import Icon from '../../Utils/Icon/Icon';
import styles from './CartDrawerCloseButton.module.css';

/**
 * CartDrawerCloseButton
 *
 * Provides the accessible dismissal action for the cart overlay.
 */
function CartDrawerCloseButton({ onClick }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Close cart"
    >
      <Icon name="ri-close-line" size="1.6rem" ariaLabel="" />
    </button>
  );
}

export default CartDrawerCloseButton;
