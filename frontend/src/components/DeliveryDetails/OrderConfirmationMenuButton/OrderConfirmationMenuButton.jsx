import Icon from '../../Utils/Icon/Icon';
import styles from './OrderConfirmationMenuButton.module.css';

/**
 * OrderConfirmationMenuButton
 *
 * Provides the post-checkout path back to menu discovery.
 */
function OrderConfirmationMenuButton({ onClick }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      autoFocus
    >
      Back to Menu
      <Icon name="ri-arrow-right-line" size="1.15rem" ariaLabel="" />
    </button>
  );
}

export default OrderConfirmationMenuButton;
