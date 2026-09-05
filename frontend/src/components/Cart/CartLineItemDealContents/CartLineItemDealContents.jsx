import styles from './CartLineItemDealContents.module.css';

/**
 * CartLineItemDealContents
 *
 * Summarizes bundled deal contents without expanding them into independent cart lines.
 */
const describeItem = (item) => {
  const variationText = (item.variationSelections || []).map((selection) => selection.optionLabel).join(', ');
  return variationText ? `${item.quantity}× ${item.title} (${variationText})` : `${item.quantity}× ${item.title}`;
};

function CartLineItemDealContents({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <p className={styles.items}>
      <strong>Includes:</strong> {items.map(describeItem).join(', ')}
    </p>
  );
}

export default CartLineItemDealContents;
