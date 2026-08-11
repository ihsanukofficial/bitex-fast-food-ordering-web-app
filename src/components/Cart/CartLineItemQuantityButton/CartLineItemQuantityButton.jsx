import Icon from '../../Utils/Icon/Icon';
import styles from './CartLineItemQuantityButton.module.css';

/**
 * CartLineItemQuantityButton
 *
 * Provides an accessible increment or decrement action for cart quantities.
 */
function CartLineItemQuantityButton({
  iconName,
  label,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
    >
      <Icon name={iconName} size="0.9rem" ariaLabel="" />
    </button>
  );
}

export default CartLineItemQuantityButton;
