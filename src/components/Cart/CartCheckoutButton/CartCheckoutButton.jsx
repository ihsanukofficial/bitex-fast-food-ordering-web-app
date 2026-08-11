import Icon from '../../Utils/Icon/Icon';
import styles from './CartCheckoutButton.module.css';

/**
 * CartCheckoutButton
 *
 * Advances a non-empty cart into the delivery-details flow.
 */
function CartCheckoutButton({ disabled, onClick }) {
  return (
    <button type="button" className={styles.button} disabled={disabled} onClick={onClick}>
      Proceed to Checkout
      <Icon name="ri-arrow-right-line" ariaLabel="" />
    </button>
  );
}

export default CartCheckoutButton;
