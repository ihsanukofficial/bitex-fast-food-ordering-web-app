import Icon from '../../Utils/Icon/Icon';
import styles from './DealDetailAddToCartButton.module.css';

/**
 * DealDetailAddToCartButton
 *
 * Adds the currently configured quantity of this deal to the cart.
 */
function DealDetailAddToCartButton({ total, onClick }) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <Icon name="ri-shopping-cart-2-line" size="1.25rem" ariaLabel="" />
      Add to Cart · Rs. {total.toLocaleString('en-PK')}
    </button>
  );
}

export default DealDetailAddToCartButton;
