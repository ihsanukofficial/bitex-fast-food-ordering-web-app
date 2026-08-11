import CartCheckoutButton from '../CartCheckoutButton/CartCheckoutButton';
import CartOrderTotals from '../CartOrderTotals/CartOrderTotals';
import CartPromoCodeForm from '../CartPromoCodeForm/CartPromoCodeForm';
import styles from './CartDrawerSummary.module.css';

/**
 * CartDrawerSummary
 *
 * Groups the derived summary information for the cart experience.
 */
function CartDrawerSummary({
  subtotal,
  discount,
  total,
  onPromoApply,
  onCheckout,
}) {
  return (
    <footer className={styles.summary}>
      <CartPromoCodeForm onApply={onPromoApply} />
      <CartOrderTotals
        subtotal={subtotal}
        discount={discount}
        total={total}
      />
      <CartCheckoutButton disabled={subtotal <= 0} onClick={onCheckout} />
    </footer>
  );
}

export default CartDrawerSummary;
