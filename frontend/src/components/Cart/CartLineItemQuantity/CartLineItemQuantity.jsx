import CartLineItemQuantityButton from '../CartLineItemQuantityButton/CartLineItemQuantityButton';
import CartLineItemQuantityValue from '../CartLineItemQuantityValue/CartLineItemQuantityValue';
import { MAX_CART_ITEM_QUANTITY } from '../../../utils/cartConstants';
import styles from './CartLineItemQuantity.module.css';

/**
 * CartLineItemQuantity
 *
 * Constrains quantity controls to cart limits and exposes the resulting value changes
 * to the cart owner.
 */
function CartLineItemQuantity({ quantity, onChange }) {
  return (
    <div className={styles.quantity} aria-label="Item quantity">
      <CartLineItemQuantityButton
        iconName="ri-subtract-line"
        label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => onChange(quantity - 1)}
      />
      <CartLineItemQuantityValue quantity={quantity} />
      <CartLineItemQuantityButton
        iconName="ri-add-line"
        label="Increase quantity"
        disabled={quantity >= MAX_CART_ITEM_QUANTITY}
        onClick={() => onChange(quantity + 1)}
      />
    </div>
  );
}

export default CartLineItemQuantity;
