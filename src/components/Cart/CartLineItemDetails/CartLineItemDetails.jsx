import CartLineItemAddons from '../CartLineItemAddons/CartLineItemAddons';
import CartLineItemDealContents from '../CartLineItemDealContents/CartLineItemDealContents';
import CartLineItemNotes from '../CartLineItemNotes/CartLineItemNotes';
import CartLineItemTitle from '../CartLineItemTitle/CartLineItemTitle';
import CartLineItemVariations from '../CartLineItemVariations/CartLineItemVariations';
import styles from './CartLineItemDetails.module.css';

/**
 * CartLineItemDetails
 *
 * Groups related cart details without introducing additional state ownership.
 */
function CartLineItemDetails({
  title,
  variations = [],
  addons = [],
  notes,
  dealItems = [],
}) {
  return (
    <div className={styles.details}>
      <CartLineItemTitle>{title}</CartLineItemTitle>
      <CartLineItemDealContents items={dealItems} />
      <CartLineItemVariations variations={variations} />
      <CartLineItemAddons addons={addons} />
      <CartLineItemNotes notes={notes} />
    </div>
  );
}

export default CartLineItemDetails;
