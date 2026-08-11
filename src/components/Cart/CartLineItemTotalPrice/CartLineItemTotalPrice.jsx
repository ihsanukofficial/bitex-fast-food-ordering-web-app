import styles from './CartLineItemTotalPrice.module.css';

/**
 * CartLineItemTotalPrice
 *
 * Formats and presents pricing within the cart experience.
 */
function CartLineItemTotalPrice({ amount }) {
  return (
    <strong className={styles.price}>
      Rs. {amount.toLocaleString('en-PK')}
    </strong>
  );
}

export default CartLineItemTotalPrice;
