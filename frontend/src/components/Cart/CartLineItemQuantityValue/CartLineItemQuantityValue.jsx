import styles from './CartLineItemQuantityValue.module.css';

/**
 * CartLineItemQuantityValue
 *
 * Renders a formatted value within the cart presentation.
 */
function CartLineItemQuantityValue({ quantity }) {
  return <output className={styles.value}>{quantity}</output>;
}

export default CartLineItemQuantityValue;
