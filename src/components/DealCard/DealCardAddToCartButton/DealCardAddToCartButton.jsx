import Icon from '../../Utils/Icon/Icon';
import styles from './DealCardAddToCartButton.module.css';

/**
 * DealCardAddToCartButton
 *
 * Exposes deal selection while communicating when pricing is unavailable.
 */
function DealCardAddToCartButton({
  label = 'Choose Deal',
  disabled = false,
  onClick,
}) {
  return (
    <button
      className={styles.button}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name="ri-shopping-cart-2-line" size="1.05rem" ariaLabel="" />
      {label}
    </button>
  );
}

export default DealCardAddToCartButton;
