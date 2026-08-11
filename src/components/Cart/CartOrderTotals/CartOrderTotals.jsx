import CartOrderTotalRow from '../CartOrderTotalRow/CartOrderTotalRow';
import styles from './CartOrderTotals.module.css';

/**
 * CartOrderTotals
 *
 * Presents the monetary summary derived by the cart owner.
 */
function CartOrderTotals({ subtotal, discount, total }) {
  return (
    <dl className={styles.totals}>
      <CartOrderTotalRow
        label="Subtotal"
        value={`Rs. ${subtotal.toLocaleString('en-PK')}`}
      />
      {discount > 0 && (
        <CartOrderTotalRow
          label="Discount"
          value={`- Rs. ${discount.toLocaleString('en-PK')}`}
          variant="discount"
        />
      )}
      <CartOrderTotalRow
        label="Total"
        value={`Rs. ${total.toLocaleString('en-PK')}`}
        variant="grandTotal"
      />
    </dl>
  );
}

export default CartOrderTotals;
