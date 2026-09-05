import Icon from '../../Utils/Icon/Icon';
import styles from './CartEmptyStateIcon.module.css';

/**
 * CartEmptyStateIcon
 *
 * Renders the icon treatment used by the cart experience.
 */
function CartEmptyStateIcon() {
  return (
    <span className={styles.icon}>
      <Icon name="ri-shopping-basket-line" size="2.5rem" ariaLabel="" />
    </span>
  );
}

export default CartEmptyStateIcon;
