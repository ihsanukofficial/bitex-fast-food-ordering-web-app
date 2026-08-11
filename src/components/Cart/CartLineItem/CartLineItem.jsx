import CartLineItemActions from '../CartLineItemActions/CartLineItemActions';
import CartLineItemDetails from '../CartLineItemDetails/CartLineItemDetails';
import CartLineItemImage from '../CartLineItemImage/CartLineItemImage';
import CartLineItemPricing from '../CartLineItemPricing/CartLineItemPricing';
import CartLineItemQuantity from '../CartLineItemQuantity/CartLineItemQuantity';
import CartLineItemRemoveButton from '../CartLineItemRemoveButton/CartLineItemRemoveButton';
import CartLineItemShell from '../CartLineItemShell/CartLineItemShell';
import CartLineItemTransition from '../CartLineItemTransition/CartLineItemTransition';

/**
 * CartLineItem
 *
 * Composes a hydrated cart entry while delegating quantity changes and removal
 * behavior to the cart owner.
 */
function CartLineItem({
  item,
  isRemoving = false,
  removeDisabled = false,
  onQuantityChange,
  onRemove,
  onRemovalComplete,
}) {
  return (
    <CartLineItemTransition
      cartIndex={item.cartIndex}
      isRemoving={isRemoving}
      onRemovalComplete={onRemovalComplete}
    >
      <CartLineItemShell>
        <CartLineItemImage src={item.image} alt={item.title} />
        <CartLineItemDetails
          title={item.title}
          variations={item.selections.variations}
          addons={item.selections.addons}
          notes={item.specialInstructions}
          dealItems={item.dealItems}
        />
        <CartLineItemPricing
          unitPrice={item.unitPrice}
          lineTotal={item.lineTotal}
        />
        <CartLineItemActions>
          <CartLineItemQuantity
            quantity={item.quantity}
            onChange={onQuantityChange}
          />
          <CartLineItemRemoveButton
            disabled={removeDisabled}
            onClick={onRemove}
          />
        </CartLineItemActions>
      </CartLineItemShell>
    </CartLineItemTransition>
  );
}

export default CartLineItem;
