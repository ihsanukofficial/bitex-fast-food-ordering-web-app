import styles from './CartLineItemUnitPrice.module.css';

/**
 * CartLineItemUnitPrice
 *
 * Formats and presents pricing within the cart experience.
 */
function CartLineItemUnitPrice({ amount }) {
  return (
    <small className={styles.price}>
      Rs. {amount.toLocaleString('en-PK')} each
    </small>
  );
}

export default CartLineItemUnitPrice;
