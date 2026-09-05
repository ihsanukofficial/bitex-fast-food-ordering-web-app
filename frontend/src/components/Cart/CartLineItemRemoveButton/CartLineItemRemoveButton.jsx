import Icon from '../../Utils/Icon/Icon';
import styles from './CartLineItemRemoveButton.module.css';

/**
 * CartLineItemRemoveButton
 *
 * Starts the animated removal flow for one cart entry.
 */
function CartLineItemRemoveButton({ disabled = false, onClick }) {
  return (
    <button
      type="button"
      className={styles.remove}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name="ri-delete-bin-line" size="0.95rem" ariaLabel="" />
      Remove
    </button>
  );
}

export default CartLineItemRemoveButton;
