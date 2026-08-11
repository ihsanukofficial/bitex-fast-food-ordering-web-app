import CartLineItemTotalPrice from '../CartLineItemTotalPrice/CartLineItemTotalPrice';
import CartLineItemUnitPrice from '../CartLineItemUnitPrice/CartLineItemUnitPrice';
import styles from './CartLineItemPricing.module.css';

/**
 * CartLineItemPricing
 *
 * Groups unit and line-total pricing for one cart entry.
 */
function CartLineItemPricing({ unitPrice, lineTotal }) {
  return (
    <div className={styles.price}>
      <CartLineItemTotalPrice amount={lineTotal} />
      <CartLineItemUnitPrice amount={unitPrice} />
    </div>
  );
}

export default CartLineItemPricing;
